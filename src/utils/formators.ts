export const formatPrice = (price: string | number) => {
  const formater = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  return formater.format(Number(price)).replace("€", "").trim().toString();
};
