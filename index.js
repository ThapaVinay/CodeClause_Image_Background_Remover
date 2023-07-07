
function App() {

    const [spinner, setSpinner] = React.useState(false);

    var loading = "loading.gif";
    var imageUrl;

    const handleUpload = (e) => {

        setSpinner(true);

        const fileInput = document.getElementById('file');

        const image = fileInput.files[0];

        const form = new FormData();
        form.append("image_file", image);
        form.append("size", "auto");

        const apiKey = "PVj6azcCBvSXyaPmS3zooCHE";

        fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                'X-Api-Key': apiKey,
            },
            body: form
        })
            .then(function (response) {
                return response.blob();
            })
            .then(function (blob) {
                console.log(blob);

                const url = URL.createObjectURL(blob);
                imageUrl = url;
                setSpinner(false);
                console.log(imageUrl);
            })
            .catch();

        console.log("clicked");
    }


    const downloadFile = () => {

        var anchor = document.createElement('a');
        anchor.href = imageUrl;

        anchor.download = "no-bg-png";
        anchor.style.display = "none";

        document.body.appendChild(anchor);

        anchor.click();
        document.body.removeChild();

    }

    return (
        <>
            <h2 className="d-flex justify-content-center my-5" style={{ fontFamily: "'Poppins', sans-serif" }}>Image Background remover</h2>

            <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                <form>
                    <div className="d-flex justify-content-center" >
                        <label htmlFor="file" className="drop-container">
                            <span className="drop-title">Drop files here</span>
                            or
                            <input className="form-control form-input-inner" type="file" id="file" name="file" />
                        </label>
                    </div>
                </form>

                <div className="d-flex justify-content-center mb-5" >
                    <button className="btn submit-button" type="button" onClick={handleUpload}>Submit</button>
                </div>

                <span className="ps-5 grey-color pe-3"> Output</span>
                <div className="d-inline-block">
                    <span className="grey-line"></span>
                </div>

                {spinner ? <div className='text-center mt-5'>
                    <img src={loading} className="my-3" alt="loading" width="40px" />
                </div>
                    : imageUrl ? <div className="d-flex justify-content-center">
                        < img id="image" src={imageUrl} alt="Welcome!" />
                    </div> : <p className="d-flex justify-content-center mt-3" > Upload image to remove Background</p>
                }

                <div className="d-flex justify-content-center my-2">
                    <button disabled = {imageUrl ? false: true} className="btn submit-button" onClick={downloadFile}> Download </button>
                </div>

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