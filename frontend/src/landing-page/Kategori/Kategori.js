// Kategori.js
import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import './Kategori.css';

const Kategori = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default selected category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/kategori');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const allCategory = { id: 0, nama_kategori: "All" };
        setCategories([allCategory, ...data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        setLoading(false);
      }
    };

    fetchCategories();

    // Set "All" as the default selected category
    setSelectedCategory("All");
  }, []);

  function getCategoryColor(index) {
    const colors = ['#265073', '#1B1A55', '#0D9276', '#332941', '#596FB7', '#31304D', '#A25772', '#535C91', '#7FC7D9', '#362FD9'];
    return colors[index % colors.length];
  }

  const categoriesPerRow = 4;

  const groupedCategories = categories.reduce((acc, category, index) => {
    const rowIndex = Math.floor(index / categoriesPerRow);
    acc[rowIndex] = acc[rowIndex] || [];
    acc[rowIndex].push(category);
    return acc;
  }, []);

  return (
    <div style={{ backgroundColor: '#5a5c69' }}>
      <div className='mt-5 container'>
        <div className="category-container">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            ) : (
              <>
              <div style={{ padding: '35px', textAlign: 'center' }}>
                <h1 style={{ color:'white'}}>Album</h1>
                <div style={{ padding: '35px' }}>
                {groupedCategories.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.map((category, colIndex) => (
                      <Col
                        key={category.id_kategori}
                        className={`category-item ${selectedCategory === category.nama_kategori ? 'selected' : ''}`}
                        onClick={() => {
                          onSelectCategory(category.nama_kategori);
                          setSelectedCategory(category.nama_kategori);
                        }}
                        style={{ backgroundColor: getCategoryColor(colIndex + rowIndex * categoriesPerRow) }}
                      >
                        <div className="category-lines-container">
                          <p className='fw-bold text-center' style={{ color: '#fff' }}>{category.nama_kategori}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
                </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Kategori;



// Kategori.js yang memunculkan jumlah foto namun jumlah tidak terdetek
// import React, { useState, useEffect } from 'react';
// import { Card, Col, Row, Spinner } from 'react-bootstrap';
// import './Kategori.css';

// const Kategori = ({ onSelectCategory }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [photoCounts, setPhotoCounts] = useState({});

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/kategori');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         const allCategory = { id: 0, nama_kategori: "All" };
//         setCategories([allCategory, ...data]);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching categories:', error.message);
//         setLoading(false);
//       }
//     };

//     const fetchPhotoCounts = async () => {
//       try {
//         const promises = categories.map(async (category) => {
//           const response = await fetch(`http://127.0.0.1:8000/api/photoCount/${category.id}`);
//           if (!response.ok) {
//             throw new Error(`Network response was not ok for category ${category.nama_kategori}`);
//           }
//           const data = await response.json();
//           return { categoryId: category.id, count: data.count };
//         });

//         const results = await Promise.all(promises);

//         const counts = {};
//         results.forEach(({ categoryId, count }) => {
//           counts[categoryId] = count;
//         });

//         setPhotoCounts(counts);
//       } catch (error) {
//         console.error('Error fetching photo counts:', error.message);
//       }
//     };

//     fetchCategories();
//     fetchPhotoCounts();
//   }, [categories]);

//   const getCategoryColor = (index) => {
//     const colors = ['#FC6736', '#FFB0B0', '#EFECEC', '#FFDD95', '#ED9ED6', '#FFC7C7', '#E1F0DA', '#86A7FC'];
//     return colors[index % colors.length];
//   };

//   const categoriesPerRow = 5;

//   // Group categories into arrays with the desired number of categories per row
//   const groupedCategories = categories.reduce((acc, category, index) => {
//     const rowIndex = Math.floor(index / categoriesPerRow);
//     acc[rowIndex] = acc[rowIndex] || [];
//     acc[rowIndex].push(category);
//     return acc;
//   }, []);

//   return (
//     <div>
//       <div className='mt-4'>
//         <h1 className='fw-bold fs-4'>Kategori</h1>
//         <Card className="category-container">
//           <Card.Body>
//             {loading ? (
//               <div className="text-center">
//                 <Spinner animation="border" role="status"></Spinner>
//               </div>
//             ) : (
//               <>
//                 {groupedCategories.map((row, rowIndex) => (
//                   <Row key={rowIndex}>
//                     {row.map((category, colIndex) => (
//                       <Col
//                         key={category.id_kategori}
//                         className="category-item"
//                         onClick={() => onSelectCategory(category.nama_kategori)}
//                         style={{ backgroundColor: getCategoryColor(colIndex + rowIndex * categoriesPerRow) }}
//                       >
//                         <div className="category-lines-container">
//                           <p className='fw-bold text-center'>{category.nama_kategori}</p>
//                           <p className='text-center'>{photoCounts[category.id] || 0} Photos</p>
//                         </div>
//                       </Col>
//                     ))}
//                   </Row>
//                 ))}
//               </>
//             )}
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Kategori;
