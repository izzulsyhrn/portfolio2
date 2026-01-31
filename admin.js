if(localStorage.getItem("adminLoggedIn") !== "true"){
  window.location.href = "admin-login.html";
}

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const tbody = document.querySelector("tbody");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const approvedCount = document.getElementById("approvedCount");
const rejectedCount = document.getElementById("rejectedCount");


function render(){
    function updateStats(){
  totalCount.textContent = bookings.length;
  pendingCount.textContent = bookings.filter(b => b.status==="Pending").length;
  approvedCount.textContent = bookings.filter(b => b.status==="Approved").length;
  rejectedCount.textContent = bookings.filter(b => b.status==="Rejected").length;
}

  tbody.innerHTML = "";
  bookings.forEach((b,i)=>{
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.service}</td>
      <td>${b.date}</td>
      <td>${b.time}</td>
      <td>
        <select onchange="updateStatus(${i}, this.value)">
          <option ${b.status==="Pending"?"selected":""}>Pending</option>
          <option ${b.status==="Approved"?"selected":""}>Approved</option>
          <option ${b.status==="Rejected"?"selected":""}>Rejected</option>
        </select>
      </td>
      <td><button onclick="remove(${i})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

function updateStatus(i,status){
  bookings[i].status = status;
  save();
}

function remove(i){
  bookings.splice(i,1);
  save();
}

function save(){
  localStorage.setItem("bookings", JSON.stringify(bookings));
  render();
}

function logout(){
  localStorage.removeItem("adminLoggedIn");
  location.href = "admin-login.html";
}

function exportCSV(){
  let csv = "Name,Email,Service,Date,Time,Status\n";
  bookings.forEach(b=>{
    csv += `${b.name},${b.email},${b.service},${b.date},${b.time},${b.status}\n`;
  });
  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bookings.csv";
  a.click();
}

render();
