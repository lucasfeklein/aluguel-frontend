import { useEffect, useState } from "react";
import api from "../../axiosConfig";

type MonthDictionaryType = {
  [key: string]: string;
};

const monthDictionary: MonthDictionaryType = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

type DelayedBooks = [string, { bookTitle: string; averageDelay: number }[]][];
function DelayedBooks() {
  const [delayedBooks, setDelayedBooks] = useState<DelayedBooks | undefined>(
    undefined
  );
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function top3DelayedBooksPerMonth() {
      const response = await api("/book/top3delayedbooks");
      setDelayedBooks(Object.entries(response.data));
    }

    top3DelayedBooksPerMonth();
  }, []);

  console.log(delayedBooks);
  return (
    <div className="w-[90%] mx-auto mt-5">
      <h2 className="text-lg font-bold mb-4">
        Top 3 Delayed Books per Month in {currentYear}
      </h2>
      <div className="flex gap-4 flex-wrap">
        {delayedBooks?.map(
          ([month, books], idx) =>
            books.length > 0 && (
              <div key={idx} className="border w-[250px]">
                <p className="font-bold">{monthDictionary[month.slice(5)]}</p>
                <div>
                  {books.map((book) => (
                    <p>{book.bookTitle}</p>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default DelayedBooks;
