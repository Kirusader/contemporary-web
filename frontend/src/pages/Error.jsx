/** @format */

import MainNavigation from "./MainNavigation";

export default function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main style={{ margin: "2rem auto", textAlign: "center" }}>
        <h1>An Error Occurred!!</h1>
        <p>Couldn't find this page!!</p>
      </main>
    </>
  );
}
