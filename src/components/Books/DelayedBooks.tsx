import { useEffect, useState } from "react";
import api from "../../axiosConfig";

type DelayedBooks = [string, { bookTitle: string; averageDelay: number }[]][];
function DelayedBooks() {
  const [delayedBooks, setDelayedBooks] = useState<DelayedBooks | undefined>(
    undefined
  );
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function top3DelayedBooksPerMonth() {
      const response = await api("/book/top3delayedbooks");
      console.log(Object.entries(response.data));
      setDelayedBooks(Object.entries(response.data));
    }

    top3DelayedBooksPerMonth();
  }, []);
  return (
    <div className="w-[90%] mx-auto mt-5">
      Top 3 Delayed Books per Month in {currentYear}
    </div>
  );
}

export default DelayedBooks;
