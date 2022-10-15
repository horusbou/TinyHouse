import { Google } from "../../../lib/api"
import { Viewer, Database, User } from "../../../lib/types"
import { LogInArgs } from "./types"
import crypto from 'node:crypto'
import { WithId } from 'mongodb'

const logInViaGoogle = async (code: string, token: string, db: Database): Promise<WithId<User> | null> => {
  const { user } = await Google.logIn(code)

  if (!user)
    throw new Error("Google login error")

  // Names/Photos/Email Lists
  const userNamesList = user.names && user.names.length ? user.names : null
  const userPhotosList = user.photos && user.photos.length ? user.photos : null
  const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null

  const userName = userNamesList ? userNamesList[0].displayName : null

  const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source ? userNamesList[0].metadata.source.id : null

  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null

  const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null

  if (!userId || !userName || !userAvatar || !userEmail)
    throw new Error('Google login error')

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token
      }
    },
    { returnDocument: 'after' }
  )
  let viewer = updateRes.value

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: []
    })
    viewer = await db.users.findOne({ _id: userId })
  }
  return viewer
}

function authUrl(): string {
  try {
    return Google.authUrl;
  } catch (err) {
    throw new Error(`Failed to query Google Auth Url: ${err}`)
  }
}
async function logIn(_root: undefined, { input }: LogInArgs, { db }: { db: Database }) {
  try {
    //login in with google Auth url

    const code = input ? input.code : null
    const token = crypto.randomBytes(16).toString()

    const viewer: User | null = code ? await logInViaGoogle(code, token, db) : null

    if (!viewer)
      return { didRequest: true }

    return {
      _id: viewer._id,
      token: viewer.token,
      avatar: viewer.avatar,
      walletId: viewer.walletId,
      didRequest: true
    }
  } catch (err) {
    throw new Error(`Failed to log in: ${err}`)
  }
}
function logOut() {
  try {
    return { didRequest: true }
  } catch (error) {
    throw new Error(`Failed to log out: ${error}`)
  }
}
export const viewerResolvers = {
  Viewer: {
    id: (viewer: Viewer): string | undefined => viewer._id,
    hasWallet: (viewer: Viewer): true | undefined => viewer.walletId ? true : undefined
  },
  Query: {
    authUrl
  },
  Mutation: {
    logIn,
    logOut
  }

}
