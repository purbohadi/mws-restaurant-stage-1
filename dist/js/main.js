let restaurants;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{DBHelper.initServiceWorker(),init()}),init=(async()=>{response=await APIHelper.fetchRestaurants(),restaurants=await response.json();const e=[],t=new Set,n=new Set;restaurants.forEach(a=>{t.add(a.neighborhood),n.add(a.cuisine_type),e.push(DBHelper.add(a))}),fillNeighborhoodsHTML(t),fillCuisinesHTML(n),Promise.all(e).then(()=>{updateRestaurants()}).catch(e=>{console.log(e)})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,n.tabIndex=0,t.append(n)})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,n.tabIndex=0,t.append(n)})}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,s=e[n].value,r=t[a].value;APIHelper.fetchRestaurantByCuisineAndNeighborhood(s,r).then(e=>{resetRestaurants(e),fillRestaurantsHTML(e)}).catch(e=>console.error(e))}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),createRestaurantHTML=(e=>{const t=`\n  <li>\n  <picture>\n    <source srcset="img/${e.id}.webp" type="image/webp">\n    <img class="restaurant-img" src="img/${e.id}.png" type="image/png" alt="Picture of the restaurant ${e.name}">\n  </picture>\n    <div class="restaurant-infos">\n      <h1 tabindex="0">${e.name}</h1>\n      <p>${e.neighborhood}</p>\n      <p>${e.address}</p>\n      <a href="./restaurant.html?id=${e.id}">View Details</a>\n    </div>\n  </li>\n  `;return document.createRange().createContextualFragment(t)}),addMarkersToMap=((e=self.restaurants)=>{if("undefined"==typeof google)return self.markers;e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicmVzdGF1cmFudHMiLCJtYXAiLCJtYXJrZXJzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJEQkhlbHBlciIsImluaXRTZXJ2aWNlV29ya2VyIiwiaW5pdCIsImFzeW5jIiwicmVzcG9uc2UiLCJBUElIZWxwZXIiLCJmZXRjaFJlc3RhdXJhbnRzIiwianNvbiIsInJlc3RhdXJhbnRzUHJvbWlzZXMiLCJuZWlnaGJvcmhvb2RzIiwiU2V0IiwiY3Vpc2luZXMiLCJmb3JFYWNoIiwicmVzdGF1cmFudCIsImFkZCIsIm5laWdoYm9yaG9vZCIsImN1aXNpbmVfdHlwZSIsInB1c2giLCJmaWxsTmVpZ2hib3Job29kc0hUTUwiLCJmaWxsQ3Vpc2luZXNIVE1MIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJ1cGRhdGVSZXN0YXVyYW50cyIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsInNlbGVjdCIsImdldEVsZW1lbnRCeUlkIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInZhbHVlIiwidGFiSW5kZXgiLCJhcHBlbmQiLCJjdWlzaW5lIiwid2luZG93IiwiaW5pdE1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJ6b29tIiwiY2VudGVyIiwibGF0IiwibG5nIiwic2Nyb2xsd2hlZWwiLCJjU2VsZWN0IiwiblNlbGVjdCIsImNJbmRleCIsInNlbGVjdGVkSW5kZXgiLCJuSW5kZXgiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QiLCJyZXNldFJlc3RhdXJhbnRzIiwiZmlsbFJlc3RhdXJhbnRzSFRNTCIsIm0iLCJzZXRNYXAiLCJ1bCIsImNyZWF0ZVJlc3RhdXJhbnRIVE1MIiwiYWRkTWFya2Vyc1RvTWFwIiwidGVtcGxhdGUiLCJpZCIsIm5hbWUiLCJhZGRyZXNzIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJtYXJrZXIiLCJtYXBNYXJrZXJGb3JSZXN0YXVyYW50IiwiYWRkTGlzdGVuZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ1cmwiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFlBQ0osSUFBSUMsSUFDQUMsV0FLSkMsU0FBU0MsaUJBQWlCLG1CQUFxQkMsSUFDN0NDLFNBQVNDLG9CQUNUQyxTQUdGQSxLQUFPQyxXQUVIQyxlQUFpQkMsVUFBVUMsbUJBQzNCWixrQkFBb0JVLFNBQVNHLE9BRTdCLE1BQU1DLEtBQ0FDLEVBQWdCLElBQUlDLElBQ3BCQyxFQUFXLElBQUlELElBRXJCaEIsWUFBWWtCLFFBQVFDLElBQ2hCSixFQUFjSyxJQUFJRCxFQUFXRSxjQUNqQ0osRUFBU0csSUFBSUQsRUFBV0csY0FDeEJSLEVBQW9CUyxLQUFLakIsU0FBU2MsSUFBSUQsTUFFdENLLHNCQUFzQlQsR0FDdEJVLGlCQUFpQlIsR0FFakJTLFFBQVFDLElBQUliLEdBQ1BjLEtBQUssS0FDTkMsc0JBRVBDLE1BQU1DLElBQ0NDLFFBQVFDLElBQUlGLE9Bd0JwQlAsc0JBQXdCLEVBQUNULEVBQWdCbUIsS0FBS25CLGlCQUM1QyxNQUFNb0IsRUFBU2hDLFNBQVNpQyxlQUFlLHdCQUN2Q3JCLEVBQWNHLFFBQVFHLElBQ3BCLE1BQU1nQixFQUFTbEMsU0FBU21DLGNBQWMsVUFDdENELEVBQU9FLFVBQVlsQixFQUNuQmdCLEVBQU9HLE1BQVFuQixFQUNmZ0IsRUFBT0ksU0FBVyxFQUNsQk4sRUFBT08sT0FBT0wsT0F1QmxCWixpQkFBbUIsRUFBQ1IsRUFBV2lCLEtBQUtqQixZQUNsQyxNQUFNa0IsRUFBU2hDLFNBQVNpQyxlQUFlLG1CQUV2Q25CLEVBQVNDLFFBQVF5QixJQUNmLE1BQU1OLEVBQVNsQyxTQUFTbUMsY0FBYyxVQUN0Q0QsRUFBT0UsVUFBWUksRUFDbkJOLEVBQU9HLE1BQVFHLEVBQ2ZOLEVBQU9JLFNBQVcsRUFDbEJOLEVBQU9PLE9BQU9MLE9BT2xCTyxPQUFPQyxRQUFVLE1BS2ZYLEtBQUtqQyxJQUFNLElBQUk2QyxPQUFPQyxLQUFLQyxJQUFJN0MsU0FBU2lDLGVBQWUsUUFDckRhLEtBQU0sR0FDTkMsUUFMQUMsSUFBSyxVQUNMQyxLQUFNLFdBS05DLGFBQWEsSUFFZnhCLHNCQU1GQSxrQkFBb0IsTUFDbEIsTUFBTXlCLEVBQVVuRCxTQUFTaUMsZUFBZSxtQkFDbENtQixFQUFVcEQsU0FBU2lDLGVBQWUsd0JBRWxDb0IsRUFBU0YsRUFBUUcsY0FDakJDLEVBQVNILEVBQVFFLGNBRWpCZCxFQUFVVyxFQUFRRSxHQUFRaEIsTUFDMUJuQixFQUFla0MsRUFBUUcsR0FBUWxCLE1BRXJDN0IsVUFBVWdELHdDQUF3Q2hCLEVBQVN0QixHQUN0RE8sS0FBSzVCLElBQ0o0RCxpQkFBaUI1RCxHQUNuQjZELG9CQUFvQjdELEtBRXZCOEIsTUFBTUMsR0FBU0MsUUFBUUQsTUFBTUEsTUFrQmhDNkIsaUJBQW1CLENBQUM1RCxJQUVsQmtDLEtBQUtsQyxlQUNNRyxTQUFTaUMsZUFBZSxvQkFDaENHLFVBQVksR0FHZkwsS0FBS2hDLFFBQVFnQixRQUFRNEMsR0FBS0EsRUFBRUMsT0FBTyxPQUNuQzdCLEtBQUtoQyxXQUNMZ0MsS0FBS2xDLFlBQWNBLElBTXJCNkQsb0JBQXNCLEVBQUM3RCxFQUFja0MsS0FBS2xDLGVBQ3hDLE1BQU1nRSxFQUFLN0QsU0FBU2lDLGVBQWUsb0JBQ25DcEMsRUFBWWtCLFFBQVFDLElBQ2xCNkMsRUFBR3RCLE9BQU91QixxQkFBcUI5QyxNQUVqQytDLG9CQU1GRCxxQkFBdUIsQ0FBQzlDLElBa0J0QixNQUFNZ0Qsb0RBR2tCaEQsRUFBV2lELHlFQUNNakQsRUFBV2lELDJEQUEyRGpELEVBQVdrRCxvRkFHbkdsRCxFQUFXa0QsdUJBQ3pCbEQsRUFBV0UsOEJBQ1hGLEVBQVdtRCxvREFDZ0JuRCxFQUFXaUQsZ0RBUS9DLE9BSGNqRSxTQUFTb0UsY0FDQUMseUJBQXlCTCxLQVNsREQsZ0JBQWtCLEVBQUNsRSxFQUFja0MsS0FBS2xDLGVBRXBDLEdBQXFCLG9CQUFYOEMsT0FBd0IsT0FBT1osS0FBS2hDLFFBRTlDRixFQUFZa0IsUUFBUUMsSUFFbEIsTUFBTXNELEVBQVNuRSxTQUFTb0UsdUJBQXVCdkQsRUFBWWUsS0FBS2pDLEtBQ2hFNkMsT0FBT0MsS0FBSzFDLE1BQU1zRSxZQUFZRixFQUFRLFFBQVMsS0FDN0M3QixPQUFPZ0MsU0FBU0MsS0FBT0osRUFBT0ssTUFFaEM1QyxLQUFLaEMsUUFBUXFCLEtBQUtrRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHJlc3RhdXJhbnRzXHJcbnZhciBtYXBcclxudmFyIG1hcmtlcnMgPSBbXVxyXG5cclxuLyoqXHJcbiAqIEZldGNoIG5laWdoYm9yaG9vZHMgYW5kIGN1aXNpbmVzIGFzIHNvb24gYXMgdGhlIHBhZ2UgaXMgbG9hZGVkLlxyXG4gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xyXG4gIERCSGVscGVyLmluaXRTZXJ2aWNlV29ya2VyKCk7XHJcbiAgaW5pdCgpO1xyXG59KTtcclxuXHJcbmluaXQgPSBhc3luYyAoKSA9PiB7XHJcblxyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBBUElIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygpO1xyXG4gICAgcmVzdGF1cmFudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgY29uc3QgcmVzdGF1cmFudHNQcm9taXNlcyA9IFtdO1xyXG4gICAgY29uc3QgbmVpZ2hib3Job29kcyA9IG5ldyBTZXQoKTtcclxuICAgIGNvbnN0IGN1aXNpbmVzID0gbmV3IFNldCgpO1xyXG5cclxuICAgIHJlc3RhdXJhbnRzLmZvckVhY2gocmVzdGF1cmFudCA9PiB7XHJcbiAgICAgICAgbmVpZ2hib3Job29kcy5hZGQocmVzdGF1cmFudC5uZWlnaGJvcmhvb2QpO1xyXG4gICAgY3Vpc2luZXMuYWRkKHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlKTtcclxuICAgIHJlc3RhdXJhbnRzUHJvbWlzZXMucHVzaChEQkhlbHBlci5hZGQocmVzdGF1cmFudCkpO1xyXG59KTtcclxuICAgIGZpbGxOZWlnaGJvcmhvb2RzSFRNTChuZWlnaGJvcmhvb2RzKTtcclxuICAgIGZpbGxDdWlzaW5lc0hUTUwoY3Vpc2luZXMpO1xyXG5cclxuICAgIFByb21pc2UuYWxsKHJlc3RhdXJhbnRzUHJvbWlzZXMpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVJlc3RhdXJhbnRzKClcclxuICAgIH0pXHJcbi5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbn0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEZldGNoIGFsbCBuZWlnaGJvcmhvb2RzIGFuZCBzZXQgdGhlaXIgSFRNTC5cclxuICovXHJcbi8qXHJcbmZldGNoTmVpZ2hib3Job29kcyA9ICgpID0+IHtcclxuICBEQkhlbHBlci5mZXRjaE5laWdoYm9yaG9vZHMoKGVycm9yLCBuZWlnaGJvcmhvb2RzKSA9PiB7XHJcbiAgICBpZiAoZXJyb3IpIHsgLy8gR290IGFuIGVycm9yXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZi5uZWlnaGJvcmhvb2RzID0gbmVpZ2hib3Job29kcztcclxuICAgICAgZmlsbE5laWdoYm9yaG9vZHNIVE1MKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgbmVpZ2hib3Job29kcyBIVE1MLlxyXG4gKi9cclxuZmlsbE5laWdoYm9yaG9vZHNIVE1MID0gKG5laWdoYm9yaG9vZHMgPSBzZWxmLm5laWdoYm9yaG9vZHMpID0+IHtcclxuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcclxuICBuZWlnaGJvcmhvb2RzLmZvckVhY2gobmVpZ2hib3Job29kID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgb3B0aW9uLmlubmVySFRNTCA9IG5laWdoYm9yaG9vZDtcclxuICAgIG9wdGlvbi52YWx1ZSA9IG5laWdoYm9yaG9vZDtcclxuICAgIG9wdGlvbi50YWJJbmRleCA9IDA7XHJcbiAgICBzZWxlY3QuYXBwZW5kKG9wdGlvbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGZXRjaCBhbGwgY3Vpc2luZXMgYW5kIHNldCB0aGVpciBIVE1MLlxyXG4gKi9cclxuLypcclxuZmV0Y2hDdWlzaW5lcyA9ICgpID0+IHtcclxuICBEQkhlbHBlci5mZXRjaEN1aXNpbmVzKChlcnJvciwgY3Vpc2luZXMpID0+IHtcclxuICAgIGlmIChlcnJvcikgeyAvLyBHb3QgYW4gZXJyb3IhXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZi5jdWlzaW5lcyA9IGN1aXNpbmVzO1xyXG4gICAgICBmaWxsQ3Vpc2luZXNIVE1MKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBTZXQgY3Vpc2luZXMgSFRNTC5cclxuICovXHJcbmZpbGxDdWlzaW5lc0hUTUwgPSAoY3Vpc2luZXMgPSBzZWxmLmN1aXNpbmVzKSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1aXNpbmVzLXNlbGVjdCcpO1xyXG5cclxuICBjdWlzaW5lcy5mb3JFYWNoKGN1aXNpbmUgPT4ge1xyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gY3Vpc2luZTtcclxuICAgIG9wdGlvbi52YWx1ZSA9IGN1aXNpbmU7XHJcbiAgICBvcHRpb24udGFiSW5kZXggPSAwO1xyXG4gICAgc2VsZWN0LmFwcGVuZChvcHRpb24pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBHb29nbGUgbWFwLCBjYWxsZWQgZnJvbSBIVE1MLlxyXG4gKi9cclxud2luZG93LmluaXRNYXAgPSAoKSA9PiB7XHJcbiAgbGV0IGxvYyA9IHtcclxuICAgIGxhdDogNDAuNzIyMjE2LFxyXG4gICAgbG5nOiAtNzMuOTg3NTAxXHJcbiAgfTtcclxuICBzZWxmLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICB6b29tOiAxMixcclxuICAgIGNlbnRlcjogbG9jLFxyXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlXHJcbiAgfSk7XHJcbiAgdXBkYXRlUmVzdGF1cmFudHMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBwYWdlIGFuZCBtYXAgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMuXHJcbiAqL1xyXG51cGRhdGVSZXN0YXVyYW50cyA9ICgpID0+IHtcclxuICBjb25zdCBjU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1aXNpbmVzLXNlbGVjdCcpO1xyXG4gIGNvbnN0IG5TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcclxuXHJcbiAgY29uc3QgY0luZGV4ID0gY1NlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG4gIGNvbnN0IG5JbmRleCA9IG5TZWxlY3Quc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgY29uc3QgY3Vpc2luZSA9IGNTZWxlY3RbY0luZGV4XS52YWx1ZTtcclxuICBjb25zdCBuZWlnaGJvcmhvb2QgPSBuU2VsZWN0W25JbmRleF0udmFsdWU7XHJcblxyXG4gIEFQSUhlbHBlci5mZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QoY3Vpc2luZSwgbmVpZ2hib3Job29kKVxyXG4gICAgICAudGhlbihyZXN0YXVyYW50cyA9PiB7XHJcbiAgICAgICAgcmVzZXRSZXN0YXVyYW50cyhyZXN0YXVyYW50cyk7XHJcbiAgICAgIGZpbGxSZXN0YXVyYW50c0hUTUwocmVzdGF1cmFudHMpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbi8qXHJcbiAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKGN1aXNpbmUsIG5laWdoYm9yaG9vZCwgKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgaWYgKGVycm9yKSB7IC8vIEdvdCBhbiBlcnJvciFcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXNldFJlc3RhdXJhbnRzKHJlc3RhdXJhbnRzKTtcclxuICAgICAgZmlsbFJlc3RhdXJhbnRzSFRNTCgpO1xyXG4gICAgfVxyXG4gIH0pXHJcbiovXHJcblxyXG59XHJcblxyXG4vKipcclxuICogQ2xlYXIgY3VycmVudCByZXN0YXVyYW50cywgdGhlaXIgSFRNTCBhbmQgcmVtb3ZlIHRoZWlyIG1hcCBtYXJrZXJzLlxyXG4gKi9cclxucmVzZXRSZXN0YXVyYW50cyA9IChyZXN0YXVyYW50cykgPT4ge1xyXG4gIC8vIFJlbW92ZSBhbGwgcmVzdGF1cmFudHNcclxuICBzZWxmLnJlc3RhdXJhbnRzID0gW107XHJcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudHMtbGlzdCcpO1xyXG4gIHVsLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAvLyBSZW1vdmUgYWxsIG1hcCBtYXJrZXJzXHJcbiAgc2VsZi5tYXJrZXJzLmZvckVhY2gobSA9PiBtLnNldE1hcChudWxsKSk7XHJcbiAgc2VsZi5tYXJrZXJzID0gW107XHJcbiAgc2VsZi5yZXN0YXVyYW50cyA9IHJlc3RhdXJhbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFsbCByZXN0YXVyYW50cyBIVE1MIGFuZCBhZGQgdGhlbSB0byB0aGUgd2VicGFnZS5cclxuICovXHJcbmZpbGxSZXN0YXVyYW50c0hUTUwgPSAocmVzdGF1cmFudHMgPSBzZWxmLnJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudHMtbGlzdCcpO1xyXG4gIHJlc3RhdXJhbnRzLmZvckVhY2gocmVzdGF1cmFudCA9PiB7XHJcbiAgICB1bC5hcHBlbmQoY3JlYXRlUmVzdGF1cmFudEhUTUwocmVzdGF1cmFudCkpO1xyXG4gIH0pO1xyXG4gIGFkZE1hcmtlcnNUb01hcCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHJlc3RhdXJhbnQgSFRNTC5cclxuICovXHJcbmNyZWF0ZVJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQpID0+IHtcclxuICAvKlxyXG4gIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gIDxsaT5cclxuICAgIDxwaWN0dXJlPlxyXG4gICAgICA8c291cmNlIHNyY3NldD1cImltZy8ke3Jlc3RhdXJhbnQuaWR9LmpwZ1wiIHR5cGU9XCJpbWFnZS9wbmdcIj5cclxuICAgICAgPGltZyBjbGFzcz1cInJlc3RhdXJhbnQtaW1nXCIgdHlwZT1cImltYWdlL3BuZ1wiIGFsdD0nUGljdHVyZSBvZiB0aGUgcmVzdGF1cmFudCBhdCAke3Jlc3RhdXJhbnQubmFtZX0nIHNyYz1cImltZy8ke3Jlc3RhdXJhbnQuaWR9LnBuZ1wiIC8+IFxyXG4gICAgPC9waWN0dXJlPlxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3RhdXJhbnQtaW5mb3NcIj5cclxuICAgICAgPGgyIHRhYkluZGV4PVwiMFwiPiR7cmVzdGF1cmFudC5uYW1lfTwvaDI+XHJcbiAgICAgIDxwIHRhYkluZGV4PVwiMFwiPiAke3Jlc3RhdXJhbnQubmVpZ2hib3Job29kfSA8L3A+XHJcbiAgICAgIDxwIHRhYkluZGV4PVwiMFwiPiAke3Jlc3RhdXJhbnQuYWRkcmVzc30gPC9wPlxyXG4gICAgICA8YSBocmVmPVwiLi9yZXN0YXVyYW50Lmh0bWw/aWQ9JHtyZXN0YXVyYW50LmlkfVwiPlZpZXcgRGV0YWlsczwvYT5cclxuICAgIDwvZGl2PlxyXG4gIDwvbGk+XHJcbiAgYDtcclxuICAqL1xyXG5cclxuICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICA8bGk+XHJcbiAgPHBpY3R1cmU+XHJcbiAgICA8c291cmNlIHNyY3NldD1cImltZy8ke3Jlc3RhdXJhbnQuaWR9LndlYnBcIiB0eXBlPVwiaW1hZ2Uvd2VicFwiPlxyXG4gICAgPGltZyBjbGFzcz1cInJlc3RhdXJhbnQtaW1nXCIgc3JjPVwiaW1nLyR7cmVzdGF1cmFudC5pZH0ucG5nXCIgdHlwZT1cImltYWdlL3BuZ1wiIGFsdD1cIlBpY3R1cmUgb2YgdGhlIHJlc3RhdXJhbnQgJHtyZXN0YXVyYW50Lm5hbWV9XCI+XHJcbiAgPC9waWN0dXJlPlxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3RhdXJhbnQtaW5mb3NcIj5cclxuICAgICAgPGgxIHRhYmluZGV4PVwiMFwiPiR7cmVzdGF1cmFudC5uYW1lfTwvaDE+XHJcbiAgICAgIDxwPiR7cmVzdGF1cmFudC5uZWlnaGJvcmhvb2R9PC9wPlxyXG4gICAgICA8cD4ke3Jlc3RhdXJhbnQuYWRkcmVzc308L3A+XHJcbiAgICAgIDxhIGhyZWY9XCIuL3Jlc3RhdXJhbnQuaHRtbD9pZD0ke3Jlc3RhdXJhbnQuaWR9XCI+VmlldyBEZXRhaWxzPC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9saT5cclxuICBgO1xyXG5cclxuICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgY29uc3QgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQodGVtcGxhdGUpO1xyXG5cclxuICByZXR1cm4gZnJhZ21lbnQ7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQWRkIG1hcmtlcnMgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMgdG8gdGhlIG1hcC5cclxuICovXHJcbmFkZE1hcmtlcnNUb01hcCA9IChyZXN0YXVyYW50cyA9IHNlbGYucmVzdGF1cmFudHMpID0+IHtcclxuXHJcbiAgaWYodHlwZW9mIGdvb2dsZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGYubWFya2VycztcclxuXHJcbiAgcmVzdGF1cmFudHMuZm9yRWFjaChyZXN0YXVyYW50ID0+IHtcclxuICAgIC8vIEFkZCBtYXJrZXIgdG8gdGhlIG1hcFxyXG4gICAgY29uc3QgbWFya2VyID0gREJIZWxwZXIubWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBzZWxmLm1hcCk7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsICgpID0+IHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYXJrZXIudXJsXHJcbiAgICB9KTtcclxuICAgIHNlbGYubWFya2Vycy5wdXNoKG1hcmtlcik7XHJcbiAgfSk7XHJcbn1cclxuIl19