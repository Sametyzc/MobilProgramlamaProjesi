export const getBooksList = (querry) => {
  const response = fetch(
    "https://www.googleapis.com/books/v1/volumes?q=" + querry
  );
  const { totalItems, items } = await response.json();

  console.log("toplam: ",totalItems);
  return totalItems;
};