// Read
function handleButton() {
  const url = 'http://localhost:3000/data';
  
  // Mengambil data menggunakan fetch()
  fetch(url)
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.error(error));
}

// Menampilkan data ke dalam tabel
function display(data) {
  data.forEach(element => {
    const dataTable = document.createElement("tr");
    dataTable.innerHTML = `
      <td>${element.name}</td>
      <td>${element.username}</td>
      <td>${element.email}</td>
      <td>
        <button onclick="editData(${element.id})">Edit</button>
        <button onclick="deleteData(${element.id})">Delete</button>
      </td>
    `;
    document.getElementById("table-data").appendChild(dataTable);
  });
}

// Create
const form = document.getElementById("input-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Mengambil data dari form
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Membuat objek payload untuk dikirim ke server
  const payload = {
    name,
    username,
    email
  };

  const url = 'http://localhost:3000/data';

  // Mengirim data ke server menggunakan metode POST
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.status === 201) {
        alert("Berhasil");
      }
    })
    .catch(error => console.error(error));
});

// Update
function editData(id) {
  const name = prompt("Masukkan nama baru:");
  const username = prompt("Masukkan username baru:");
  let email = prompt("Masukkan email baru:");

  // validasi email menggunakan includes()
  if (!email.includes("@")) {
    alert("Email harus mengandung karakter @");
    return;
  }

  const payload = {
    name,
    username,
    email
  };

  const url = `http://localhost:3000/data/${id}`;

  // Mengirim data ke server menggunakan metode PUT
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.status === 200) {
        alert("Data berhasil diubah");
        location.reload();
      }
    })
    .catch(error => console.error(error));
}


// Delete
function deleteData(id) {
  const confirmation = confirm("Apakah Anda yakin ingin menghapus data ini?");

  if (confirmation) {
    const url = `http://localhost:3000/data/${id}`;

    // Mengirim permintaan DELETE ke server
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          alert("Data berhasil dihapus");
          location.reload();
        }
      })
      .catch(error => console.error(error));
  }
}

