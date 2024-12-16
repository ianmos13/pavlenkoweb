"use client";
import React from 'react';
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const TestPage = () => {
  const { data: tests, loading, error } = useFetch("/tests?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <Loader loading={loading}>
      <section>
        {error && <div>{error}</div>}
        {!error && (!tests || tests.length === 0) && <div>No tests found</div>}
        {!error && tests && tests.length > 0 && (
          <ul>
            {tests.map((test) => (
              <li key={test.id}>
                <p>TEST: {test.TEST}</p>
                <p>ID: {test.id}</p>
                <p>Document ID: {test.documentId}</p>
                <p>Created At: {new Date(test.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(test.updatedAt).toLocaleString()}</p>
                <p>Published At: {new Date(test.publishedAt).toLocaleString()}</p>
                <p>Locale: {test.locale}</p>

                {test.testMedia && (
                  <div>
                    <h3>Media</h3>
                    {test.testMedia.url && (
                      <img
                        src={`${API_URL}${test.testMedia.url}`}
                        alt={test.testMedia.alternativeText || "Media Image"}
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                    <p>Name: {test.testMedia.name}</p>
                    <p>Size: {test.testMedia.size} KB</p>
                    <p>Type: {test.testMedia.mime}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Loader>
  );
};

export default TestPage;
