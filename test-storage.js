async function test() {
  try {
    const res1 = await fetch('https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o');
    const data1 = await res1.json();
    console.log('firebasestorage.app items:', data1.items ? data1.items.map(i => i.name) : data1);
    
    const res2 = await fetch('https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.appspot.com/o');
    const data2 = await res2.json();
    console.log('appspot.com items:', data2.items ? data2.items.map(i => i.name) : data2);
  } catch (e) {
    console.error(e);
  }
}
test();
