import ReactDOM from 'react-dom';

function PortalDropdownMenu({ children }) {
    return ReactDOM.createPortal(
        children,
        document.body
    );
}

export default PortalDropdownMenu;
