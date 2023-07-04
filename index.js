
function App() {
    return(
        <h2 className="d-flex justify-content-center">Image Background remover</h2>
    );
}



const root = document.getElementById("app")

const app = (
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

ReactDOM.createRoot(root).render(app);