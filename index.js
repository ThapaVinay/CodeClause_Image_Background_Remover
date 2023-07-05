

function App() {
    let imageUrl;
    const handleUpload = (e) => {
        const fileInput = document.getElementById('file');

        const image = fileInput.files[0];
        
        const form = new FormData();
        form.append("image_file", image);
        form.append("size", "auto");

        const apiKey = "PVj6azcCBvSXyaPmS3zooCHE";

        fetch("https://api.remove.bg/v1.0/removebg",{
            method : "POST",
            headers : {
                'X-Api-Key' : apiKey,
            },
            body : form
        })
        .then(function(response)
        {
            return response.blob();
        })
        .then(function(blob)
        {
            console.log(blob);

            const url = URL.createObjectURL(blob);
            imageUrl = url;
            const img = document.createElement('img');
            img.src = url;
            document.body.appendChild(img);
        })
        .catch();

        console.log("clicked");
    }   


    const downloadFile = () => {
        var anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = "no-bg-png";

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild();

    }

    return (
        <>
            <h2 className="d-flex justify-content-center">Image Background remover</h2>
            <div className="container">
                <form >
                    <div className="form-group">
                        <label htmlFor="file"> Select a file</label>
                        <input className="form-control" type="file" id="file" name="file" />
                    </div>
                    <button type="button" onClick={handleUpload}>Upload</button>
                    <button className="btn btn-secondary" onClick={downloadFile}> Download </button>
                </form>
            </div>
        </>

    );
}



const root = document.getElementById("app")

const app = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

ReactDOM.createRoot(root).render(app);