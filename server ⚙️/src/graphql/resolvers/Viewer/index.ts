function authUrl() {
  return "Query.authUrl"
}
function logIn() {
  return "Mudation.Login"
}
function logOut() {
  return "Mutation.Logout"
}
export const viewerResolvers = {
  Query: {
    authUrl
  },
  Mutation: {
    logIn,
    logOut
  }

}
