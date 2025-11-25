import { test, expect } from "@playwright/test";

test("MoviesListPage loads movies", async ({ page }) => {
  await page.route("**/graphql", async (route) => {
    const body = await route.request().postDataJSON();

    if (body.query.includes("SearchMovies")) {
      return route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            searchMovies: {
              total: 1,
              page: 1,
              results: [
                {
                  id: 1,
                  title: "The Matrix",
                  year: 1999,
                  poster: "",
                  genres: ["Action"],
                  overview: "",
                  rating: 8.5,
                },
              ],
            },
          },
        }),
      });
    }

    return route.continue();
  });

  await page.goto("/movies");

  await expect(page.getByText("The Matrix")).toBeVisible();
});
