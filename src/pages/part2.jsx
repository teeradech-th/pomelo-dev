import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const endpoint =
    'https://api.github.com/search/repositories?q=node.js&per_page=10';
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('in effect');
    axios
      .get(`${endpoint}&page=${page}`, {
        Authorization: 'Bearer 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',
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data);
        setMaxPage(Math.ceil(response.data.total_count / 10));
        return response;
      });
  }, []);

  return (
    <div>
      <h1>Node.js on GitHub</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>description</th>
          <th>pushed at</th>
        </thead>
        <tbody>
          {searchResults.items?.map((item) => {
            return (
              <tr>
                <td>{item.full_name}</td>
                <td>{item.description}</td>
                <td>{item.pushed_at}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button onClick={() => setPage(Math.max(1, page - 1))}>
                Previos
              </button>
              {page.toLocaleString('en')}
              <button onClick={() => setPage(Math.min(maxPage, page + 1))}>
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
