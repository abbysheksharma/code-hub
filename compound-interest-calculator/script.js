function calculateInterest() {
  const principal = parseFloat(document.getElementById("principal").value);
  const contribution = parseFloat(
    document.getElementById("contribution").value
  );
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  if (isNaN(principal) || isNaN(contribution) || isNaN(rate) || isNaN(years)) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  const months = years * 12;
  const monthlyRate = rate / 12;
  let futureValue = principal * Math.pow(1 + monthlyRate, months);

  let totalInvested = principal;
  for (let i = 1; i <= months; i++) {
    futureValue += contribution * Math.pow(1 + monthlyRate, months - i);
    totalInvested += contribution;
  }

  const interest = futureValue - totalInvested;

  document.getElementById("result").innerHTML = `
        Total Amount: ₹${futureValue.toFixed(2)}<br>
        Total Invested: ₹${totalInvested.toFixed(2)}<br>
        Compound Interest Earned: ₹${interest.toFixed(2)}
    `;
}
