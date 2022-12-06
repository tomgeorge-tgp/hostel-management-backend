const SELECT = (tname) => `select * from ${tname}`;
const SELECTCON = (tname, con) => {
  let cq = "";
  for (const key in con) {
    cq += `${key} = '${con[key]}' and `;
  }
  cq = cq.slice(0, -4);

  return SELECT(tname) + " where " + cq;
};

//module.exports.INSERTCON=()

export {SELECT, SELECTCON};