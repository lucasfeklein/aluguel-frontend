import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axiosConfig";
import { useAuth } from "../AuthContext";
import DelayedBooks from "./DelayedBooks";

type BookType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: {
    id: string;
    isRented: boolean;
    rentedByPin: string;
  }[];
}[];

function Books() {
  const { person } = useAuth();
  const [books, setBooks] = useState<BookType | undefined>(undefined);

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
                      return {
                        ...copy,
                        isRented: true,
                        rentedByPin: person!.pin,
                      };
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
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4 mt-10 w-[90%] mx-auto">
        {books?.map((book) => (
          <div
            key={book.id}
            className="border rounded-md flex w-[300px] p-4 flex-col items-center"
          >
            <h2 className="mb-4">{book.title}</h2>
            {book.copies.map((copy, idx) => (
              <div
                key={idx}
                className="flex w-[200px] justify-between mb-4 items-center"
              >
                <p>Copy {idx}</p>
                {person ? (
                  <button
                    style={{ backgroundColor: copy.isRented ? "gray" : "" }}
                    className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md"
                    onClick={() => handleRent(copy.id, book.id)}
                    disabled={copy.isRented}
                  >
                    {copy.isRented && copy.rentedByPin === person.pin
                      ? "You Rented"
                      : copy.isRented
                      ? "Already rented"
                      : "Rent"}
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
      <DelayedBooks />
    </div>
  );
}

export default Books;
