// "use client"; // Needed for client-side hooks

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { useParams } from "next/navigation"; // for App Router dynamic route

// export default function YearPage() {
//   const { year } = useParams(); // gets the dynamic year from URL
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!year) return;

//     const fetchMatches = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/matches?year=${year}`);
//         console.log(res.data);
//         setMatches(res.data.matches || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [year]);

//   if (loading)
//     return (
//       <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
//     );

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f8f9fa",
//         padding: "50px 20px",
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//       }}
//     >
//       <h1 style={{ fontSize: "36px", marginBottom: "20px", color: "#333" }}>
//         IPL {year} Matches
//       </h1>

//       {matches.length === 0 ? (
//         <p style={{ color: "#555", fontSize: "18px", marginBottom: "20px" }}>
//           No matches found for {year}
//         </p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             gap: "20px",
//             maxWidth: "1000px",
//             margin: "auto",
//           }}
//         >
//           {matches.map((match, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 padding: "20px",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//                 transition: "transform 0.3s ease",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#007bff" }}>
//                 {match.teams[0]} vs {match.teams[1]}
//               </h2>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Link href={`/match/${match._id}`}>
//                   <button
//                     style={{
//                       padding: "8px 12px",
//                       border: "none",
//                       borderRadius: "6px",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       backgroundColor: "#007bff",
//                       color: "#fff",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
//                   >
//                     Match Details
//                   </button>
//                 </Link>
//                 <button
//                   style={{
//                     padding: "8px 12px",
//                     border: "none",
//                     borderRadius: "6px",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     backgroundColor: "#28a745",
//                     color: "#fff",
//                     transition: "all 0.3s ease",
//                   }}
//                   onClick={() => alert(`Generate video for ${match.teams[0]} vs ${match.teams[1]}`)}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e7e34")}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
//                 >
//                   Video Commentry
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Link href="/">
//         <button
//           style={{
//             marginTop: "40px",
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "30px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             backgroundColor: "#6c757d",
//             color: "#fff",
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
//         >
//           Back to Home
//         </button>
//       </Link>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; 

export default function YearPage() {
  const { year } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null); 
  // const [year, setYear] = useState(""); 
  const [matchDetails, setMatchDetails] = useState({});
  const [content, setContent] = useState(0);
  const [video,setVideo] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/matches?year=${year}`);
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [year]);

  const getDetails = async(id) => {
    const res = await axios.get(`http://localhost:3000/api/getDetails?id=${id}&year=${year}`);
    setMatchDetails(res.data.matchDetails);
    console.log(res.data);
  }

  const getVideo = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/generateVideo?id=${id}&year=${year}`);
    setVideo(res.data.videoUrl);
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px", color: "#333" }}>
        IPL {year} Matches
      </h1>

      {matches.length === 0 ? (
        <p style={{ color: "#555", fontSize: "18px", marginBottom: "20px" }}>
          No matches found for {year}
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          {matches.map((match, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#007bff" }}>
                {match.teams[0]} vs {match.teams[1]}
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                  }}
                  onClick={() => {setSelectedMatch(match);setContent(1),getDetails(index)}}
                >
                  Match Details
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    backgroundColor: "#28a745",
                    color: "#fff",
                  }}
                  onClick={() => {setSelectedMatch(match),setContent(2),getVideo(index)}}
                >
                  Video Commentary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMatch && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => {setSelectedMatch(null),setContent(0)}}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              position: "relative",
              maxHeight: "90vh", 
              overflowY: "auto", 
              boxSizing: "border-box", 
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={() => {setSelectedMatch(null),setContent(0),setVideo("")}}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h2>
              {selectedMatch.teams[0]} vs {selectedMatch.teams[1]}
              {content === 1 ? (
                <div>
                  {matchDetails.innings && matchDetails.innings.map((inning, idx) => (
          <div key={idx} style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "10px", color: "#333" }}>{inning.name}</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Player</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Runs</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Balls</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Fours</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Sixes</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>SR</th>
                </tr>
              </thead>
              <tbody>
                {inning.batting.map((b, i) => (
                  <tr key={i}>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.player}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.runs}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.balls}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.fours}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.sixes}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{b.strike_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
                </div>
              ) : content === 2 ? (
                <div>
                  {video?(<video src={video} controls autoPlay width="400" />):<p>Generating video...</p>}
                </div>
              ) : null}
            </h2>
            
          </div>
        </div>
      )}
    </div>
  );
}

