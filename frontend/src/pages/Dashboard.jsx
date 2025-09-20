import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard(){
  const [sweets,setSweets] = useState([]);
  const fetchSweets = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };
  const purchase = async id => {
    await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
    fetchSweets();
  };
  useEffect(()=>{ fetchSweets(); },[]);
  return (
    <div className="container">
      <h2 style={{textAlign:'center',fontFamily:'Pacifico',color:'#ff4d94'}}>Available Sweets</h2>
      <div className="card-grid">
        {sweets.map(s=>(
          <div key={s.id} className="card">
            <div style={{fontSize:'40px'}}>🍬</div>
            <h3>{s.name}</h3>
            <p>{s.category}</p>
            <p>₹{s.price}</p>
            <p>Qty: {s.quantity}</p>
            <button disabled={s.quantity<=0} onClick={()=>purchase(s.id)}>
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
