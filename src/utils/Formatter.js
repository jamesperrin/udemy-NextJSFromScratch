const Formatter = {
  formatMoney: (rate) =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, style: 'currency', currency: 'USD' }).format(rate),
};

export default Formatter;
