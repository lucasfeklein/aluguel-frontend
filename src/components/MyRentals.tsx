import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

type BookType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: { id: string; isRented: boolean }[];
}[];

function MyRentals() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookType | undefined>(undefined);

  async function handleReturnBook(copyId: string) {
    const token = localStorage.getItem("token");
    const response = await api.put(
      "/copy/returncopy",
      { copyId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      setBooks((prevBooks) => {
        return prevBooks
          ?.map((book) => {
            return {
              ...book,
              copies: book.copies.filter((copy) => copy.id !== copyId),
            };
          })
          .filter((book) => book.copies.length > 0);
      });
    }
  }

  useEffect(() => {
    async function getMyRentals() {
      try {
        const token = localStorage.getItem("token");
        const response = await api("/book/myrentals", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filteredBooks = response.data.filter(
          (book: any) => book.copies.length > 0
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching my rentals:", error);
        navigate("/");
      }
    }

    getMyRentals();
  }, []);

  return (
    <div className="flex justify-center mt-[40px]">
      <div>
        <h2>List of your rentals</h2>
        {books?.map((book) => (
          <div key={book.title} className="my-5">
            <p>{book.title}</p>
            <div>
              {book.copies.map((copy) => (
                <div key={copy.id}>
                  <p>Copy code: {copy.id}</p>
                  <button
                    onClick={() => handleReturnBook(copy.id)}
                    className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md"
                  >
                    Return
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRentals;
