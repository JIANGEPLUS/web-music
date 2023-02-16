export const numberFormat = (value) => {
  var param = {};
  var k = 10000,
      sizes = ['', '万', '亿', '万亿'],
      i;
      if(value < k){
          param.value =value
          param.unit=''
      }else{
          i = Math.floor(Math.log(value) / Math.log(k)); 
    
          param.value = ((value / Math.pow(k, i)).toFixed(0));
          param.unit = sizes[i];
      }
return param.value+param.unit;
    }
export function toGeDan(id){
    console.log(id)
    this.$router.push({
      path:'/main/gedanpage',
      query:{
        gedanid:id
      }
    })
}
export const  toGeDan1=(id)=>{
    console.log(id)
    this.$router.push({
      path:'/main/gedanpage',
      query:{
        gedanid:id
      }
    })
}
