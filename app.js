document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('regNumber', document.getElementById('regNumber').value);

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function() {
        formData.append('fileName', file.name);
        formData.append('fileContent', btoa(reader.result)); // Convert file to base64 string

        const response = await fetch('/send-email', { // Adjust endpoint URL
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById('name').value,
                regNumber: document.getElementById('regNumber').value,
                fileName: file.name,
                fileContent: btoa(reader.result)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('File uploaded and email sent successfully!');
        } else {
            alert('Error uploading file or sending email.');
        }
    };

    reader.readAsBinaryString(file); // Read file as binary string
});
