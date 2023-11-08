import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useAuth } from "./AuthContext";

type BookType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: { id: string; isRented: boolean }[];
}[];

function MyRentals() {
  const { person } = useAuth();

  const [books, setBooks] = useState<BookType | undefined>(undefined);

  useEffect(() => {
    async function getMyRentals() {
      const token = localStorage.getItem("token");
      const response = await api("/book/myrentals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredBooks = response.data.filter(
        (book: any) => book.copies.length > 0
      );

      setBooks(filteredBooks);
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
                  <button className="bg-blue-500 text-white px-4 py-2 shadow-sm rounded-md">
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
