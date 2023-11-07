import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import { useAuth } from "./AuthContext";

type BooksType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: { id: string; isRented: boolean }[];
}[];

function Books() {
  const { person } = useAuth();
  const [books, setBooks] = useState<BooksType | undefined>(undefined);

  useEffect(() => {
    async function getBooks() {
      const response = await api("/book/");
      setBooks(response.data);
    }
    getBooks();
  }, []);

  async function handleRent(copyId: string, bookId: string) {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await api.post(
          "/copy/rentcopy/",
          {
            copyId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setBooks((prevBooks) => {
            return prevBooks?.map((book) => {
              if (book.id === bookId) {
                return {
                  ...book,
                  copies: book.copies.map((copy) => {
                    if (copy.id === copyId) {
                      return { ...copy, isRented: true };
                    }
                    return copy;
                  }),
                };
              } else {
                return book;
              }
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {books?.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          {book.copies.map((copy, idx) => (
            <div key={idx} className="flex w-[200px] justify-between mb-4">
              <p>Copy {idx}</p>
              {person ? (
                <button
                  style={{ backgroundColor: copy.isRented ? "gray" : "" }}
                  className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md"
                  onClick={() => handleRent(copy.id, book.id)}
                  disabled={copy.isRented}
                >
                  {copy.isRented ? "Already Rented" : "Rent"}
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
