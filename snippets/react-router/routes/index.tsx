import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import About from "../components/About/About";

export const CommonNavigation = () => {
  return (
    <nav
      style={{
        backgroundColor: "#f8f9fa", // Light gray background
        padding: "10px 20px", // Padding around the nav
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "97%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1000",
      }}
    >
      <ul
        style={{
          listStyleType: "none", // Remove bullets
          display: "flex",
          flexGrow: 1, // Horizontal layout
          justifyContent: "space-around", // Evenly space items
          padding: "0", // Remove default padding
          margin: "0",
          width: "200px", // Remove default margin
        }}
      >
        <li>
          <a
            href="/#/"
            style={{
              textDecoration: "none", // Remove underline
              color: "#007bff", // Blue color for links
              fontSize: "18px", // Larger font size
              fontWeight: "bold", // Bold text
              padding: "10px 15px", // Add padding around links
              borderRadius: "5px", // Rounded links
              transition: "background-color 0.3s ease", // Smooth transition
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e9ecef")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#/about"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontSize: "18px",
              fontWeight: "bold",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e9ecef")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

const CustomRouter = () => {
  return (
    <Router>
      <CommonNavigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
