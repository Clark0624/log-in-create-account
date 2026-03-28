const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const qtyInput = document.getElementById("qtyInput");

minusBtn.addEventListener("click", () => {
  let value = parseInt(qtyInput.value);
  if (value > 1) qtyInput.value = value - 1;
});

plusBtn.addEventListener("click", () => {
  let value = parseInt(qtyInput.value);
  qtyInput.value = value + 1;
});
