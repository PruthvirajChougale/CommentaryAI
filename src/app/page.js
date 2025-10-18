// import Link from "next/link";
// import styles from "../app/home.module.css";

// const years = Array.from({ length: 2025 - 2008 + 1 }, (_, i) => 2008 + i);

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <div style={{backgroundColor:"#fff",width:"100%"}}>
//         <h1 className={styles.title}>IPL Stats Dashboard</h1>
//       </div>
      
//       <p className={styles.subtitle}>
//         Explore IPL stats from 2008 to 2025. Click on a year to view detailed statistics!
//       </p>
//       <h1>Relive Every IPL Season!</h1>
//       <div className={styles.grid}>
//         {years.map((year) => (
//           <Link key={year} href={`/year/${year}`}>
//             <div className={styles.card}>
//               {year}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import styles from "../app/home.module.css";

const years = Array.from({ length: 2025 - 2008 + 1 }, (_, i) => 2008 + i);

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>IPL Stats Dashboard</h1>
        <p className={styles.subTitle}>
          Explore IPL stats from 2008 to 2025. Click on a year to view detailed statistics!
        </p>
        <h2 className={styles.sectionTitle}>Relive Every IPL Season!</h2>
      </header>

      <div className={styles.grid}>
        {years.map((year) => (
          <Link key={year} href={`/year/${year}`}>
            <div className={styles.card}>{year}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
