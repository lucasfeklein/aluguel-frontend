import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

type BooksType = [
  {
    id: string;
    title: string;
    author: string;
    isbn: string;
    copies: [];
  }
];

function Books() {
  const { person } = useAuth();
  const [books, setBooks] = useState<BooksType | undefined>(undefined);

  useEffect(() => {
    async function getBooks() {
      const response = await axios("http://localhost:3000/book/");
      setBooks(response.data);
    }
    getBooks();
  }, []);

  return (
    <div>
      {books?.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          {book.copies.map((_, idx) => (
            <div key={idx} className="flex w-[200px] justify-between mb-4">
              <p>Copy {idx}</p>
              {person ? (
                <button className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md">
                  Rent
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md">
                    Login to Rent
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Books;
