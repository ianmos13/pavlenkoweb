const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev }); 
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      
      if (pathname === "/") {
        await app.render(req, res, "/index", query);
      } else if (pathname === "/404") {
        await app.render(req, res, "/404", query);
      } else if (pathname === "/501") {
        await app.render(req, res, "/501/page", query);
      } else if (pathname === "/about-us") {
        await app.render(req, res, "/about-us/page", query);
      } else if (pathname === "/become-resident") {
        await app.render(req, res, "/become-resident/page", query);
      } else if (pathname === "/biography") {
        await app.render(req, res, "/biography/page", query);
      } else if (pathname.startsWith("/completed-enrolments/")) {
        const id = pathname.split("/")[2];
        await app.render(req, res, "/completed-enrolments/[id]/page", { id });
      } else if (pathname === "/contacts") {
        await app.render(req, res, "/contacts/page", query);
      } else if (pathname === "/documents") {
        await app.render(req, res, "/documents/page", query);
      } else if (pathname === "/for-partners") {
        await app.render(req, res, "/for-partners/page", query);
      } else if (pathname === "/intelligent-volunteers") {
        await app.render(req, res, "/intelligent-volunteers/page", query);
      } else if (pathname.startsWith("/market/")) {
        const id = pathname.split("/")[2];
        await app.render(req, res, "/market/[id]/page", { id });
      } else if (pathname === "/market") {
        await app.render(req, res, "/market/page", query);
      } else if (pathname === "/news") {
        await app.render(req, res, "/news/page", query);
      } else if (pathname === "/our-locations") {
        await app.render(req, res, "/our-locations/page", query);
      } else if (pathname === "/personal-data-processing-policy") {
        await app.render(req, res, "/personal-data-processing-policy/page", query);
      } else if (pathname === "/privacy-policy") {
        await app.render(req, res, "/privacy-policy/page", query);
      } else if (pathname === "/private-donors") {
        await app.render(req, res, "/private-donors/page", query);
      } else if (pathname === "/publications") {
        await app.render(req, res, "/publications/page", query);
      } else if (pathname === "/school-team") {
        await app.render(req, res, "/school-team/page", query);
      } else if (pathname === "/specialization-and-program") {
        await app.render(req, res, "/specialization-and-program/page", query);
      } else if (pathname === "/support") {
        await app.render(req, res, "/support/page", query);
      } else if (pathname === "/teaching-staff") {
        await app.render(req, res, "/teaching-staff/page", query);
      } else if (pathname === "/team") {
        await app.render(req, res, "/team/page", query);
      } else if (pathname === "/test") {
        await app.render(req, res, "/test/page", query);
      } else if (pathname === "/training-application-form") {
        await app.render(req, res, "/training-application-form/page", query);
      } else if (pathname === "/video-atlas") {
        await app.render(req, res, "/video-atlas/page", query);
      } else if (pathname === "/4surgeonsclub") {
        await app.render(req, res, "/4surgeonsclub/page", query);
      } else {
      
        res.statusCode = 404;
        await app.render(req, res, "/404", query);
      }
    } catch (err) {
      console.error("Error handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
