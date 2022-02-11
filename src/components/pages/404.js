import ErrorMessage from "../errrorMassage/ErrorMassage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <Link to="/" style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'display': 'block', 'marginTop': '30px' }}>Back to main page</Link>
        </div>
    )
}

export default Page404;