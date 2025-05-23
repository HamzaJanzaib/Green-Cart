import { useEffect, useState } from 'react';
import { DetailsBox } from '../../Components/Admin'
import { useAppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


const Dashboard = () => {
  const { AllOrders, Products } = useAppContext();
  const todayOrders = AllOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  const calculateOrderStats = (orders) => {
    return orders.reduce((acc, order) => {
      if (order.paymentType === "cod") {
        acc.totalCash += order.GrandTotal;
      } else {
        acc.totalOnline += order.GrandTotal;
      }
      return acc;
    }, { totalCash: 0, totalOnline: 0 });
  };
  let uniqueCategories = [];
  Products.map(item => {
    if (!uniqueCategories.includes(item.category.path)) {
      uniqueCategories.push(item.category.path);
      return item.category.path;
    }
    return null;
  }).filter(Boolean);

  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [instant, setInstant] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [bakery, setBakery] = useState([]);
  const [grains, setGrains] = useState([]);

  useEffect(() => {
    setVegetables(Products.filter(item => item.category.path === 'Vegetables'));
    setFruits(Products.filter(item => item.category.path === 'Fruits'));
    setDrinks(Products.filter(item => item.category.path === 'Drinks'));
    setInstant(Products.filter(item => item.category.path === 'Instant'));
    setDairy(Products.filter(item => item.category.path === 'Dairy'));
    setBakery(Products.filter(item => item.category.path === 'Bakery'));
    setGrains(Products.filter(item => item.category.path === 'Grains'));
  }, [Products]);


  const ProductsCategoryesChartData = [
    {
      name: "Vegetables",
      value: vegetables.length
    },
    {
      name: "Fruits",
      value: fruits.length
    },
    {
      name: "Drinks",
      value: drinks.length
    },
    {
      name: "Instant",
      value: instant.length
    },
    {
      name: "Dairy",
      value: dairy.length
    },
    {
      name: "Bakery",
      value: bakery.length
    },
    {
      name: "Grains",
      value: grains.length
    },

  ]

  const todayStats = calculateOrderStats(todayOrders);
  const allTimeStats = AllOrders.length > 0 ? calculateOrderStats(AllOrders) : { totalCash: 0, totalOnline: 0 };

  const chartData = [
    {
      name: "Today's Orders",
      Cash: todayStats.totalCash,
      Online: todayStats.totalOnline,
    },
    {
      name: "Total Orders",
      Cash: allTimeStats.totalCash,
      Online: allTimeStats.totalOnline,
    },
  ];

  return (
    <div className="no-scrollbar py-10 flex-1 h-[95vh] flex overflow-y-auto flex-col justify-between bg-[#F9FAFB]">
      <h1 className="text-2xl font-semibold uppercase">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
        {chartData.map((item) => (
          <DetailsBox
            key={item.name}
            data={{
              name: item.name,
              value: item.name === "Today's Orders" ? todayOrders.length : AllOrders.length,
              type: "Mixed",
              cash: item.Cash,
              online: item.Online
            }}
          />
        ))}
      </div>
      <div className="p-2 space-y-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="8 8" />
            <XAxis dataKey="name" interval={0} />
            <YAxis interval={0} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cash" fill="#4fbf8b" barSize={20} />
            <Bar dataKey="Online" fill="#f96c6c" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ProductsCategoryesChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {ProductsCategoryesChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}


export default Dashboard