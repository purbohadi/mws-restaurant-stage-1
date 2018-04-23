let restaurant;var map;document.addEventListener("DOMContentLoaded",e=>{DBHelper.initServiceWorker()}),initServiceWorker=(()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("./service_worker.js").then(e=>{e.update(),console.log("Service worker registered")})}),window.initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})}),fetchRestaurantFromURL=(async e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");if(t){try{if(self.restaurant=await APIHelper.fetchRestaurantById(t),!self.restaurant)return}catch(e){console.error(e)}fillRestaurantHTML(),e(null,self.restaurant)}else error="No restaurant id in URL",e(error,null)}),fillRestaurantHTML=((e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;const t=document.getElementById("restaurant-img");t.querySelector("img").className="restaurant-img",t.querySelector("img").src=`/img/${e.id}.png`,t.querySelector("source").srcset=`/img/${e.id}.webp`,t.alt=`Picture of restaurant ${e.name}`,document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()}),fillRestaurantHoursHTML=((e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let r in e){const n=document.createElement("tr"),a=document.createElement("td");a.innerHTML=r,n.appendChild(a);const s=document.createElement("td");s.innerHTML=e[r],n.appendChild(s),t.appendChild(n)}}),fillReviewsHTML=((e=self.restaurant.reviews)=>{const t=document.getElementById("reviews-container"),r=document.createElement("h4");if(r.innerHTML="Reviews",t.append(r),!e){const e=document.createElement("p");return e.innerHTML="No reviews yet!",void t.appendChild(e)}const n=document.getElementById("reviews-list");e.forEach(e=>{n.appendChild(createReviewHTML(e))}),t.appendChild(n)}),createReviewHTML=(e=>{const t=`\n  <li>\n    <p tabindex="0" class="review-name">${e.name}</p>\n    <p class="review-date">${e.date}</p>\n    <p class="review-rating"><span>Rating: ${e.rating}</span></p>\n    <p class="review-comments">${e.comments}</p>\n  </li>  \n  `;return document.createRange().createContextualFragment(t)}),fillBreadcrumb=((e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),r=document.createElement("li");r.innerHTML=e.name,t.appendChild(r)}),getParameterByName=((e,t)=>{t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const r=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RhdXJhbnRfaW5mby5qcyJdLCJuYW1lcyI6WyJyZXN0YXVyYW50IiwibWFwIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJEQkhlbHBlciIsImluaXRTZXJ2aWNlV29ya2VyIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwidGhlbiIsInJlZ2lzdHJhdGlvbiIsInVwZGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJpbml0TWFwIiwiZmV0Y2hSZXN0YXVyYW50RnJvbVVSTCIsImVycm9yIiwic2VsZiIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsInpvb20iLCJjZW50ZXIiLCJsYXRsbmciLCJzY3JvbGx3aGVlbCIsIm1hcE1hcmtlckZvclJlc3RhdXJhbnQiLCJhc3luYyIsImNhbGxiYWNrIiwiaWQiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJBUElIZWxwZXIiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiZmlsbFJlc3RhdXJhbnRIVE1MIiwiaW5uZXJIVE1MIiwibmFtZSIsImFkZHJlc3MiLCJpbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc05hbWUiLCJzcmMiLCJzcmNzZXQiLCJhbHQiLCJjdWlzaW5lX3R5cGUiLCJvcGVyYXRpbmdfaG91cnMiLCJmaWxsUmVzdGF1cmFudEhvdXJzSFRNTCIsImZpbGxSZXZpZXdzSFRNTCIsIm9wZXJhdGluZ0hvdXJzIiwiaG91cnMiLCJrZXkiLCJyb3ciLCJjcmVhdGVFbGVtZW50IiwiZGF5IiwiYXBwZW5kQ2hpbGQiLCJ0aW1lIiwicmV2aWV3cyIsImNvbnRhaW5lciIsInRpdGxlIiwiYXBwZW5kIiwibm9SZXZpZXdzIiwidWwiLCJmb3JFYWNoIiwicmV2aWV3IiwiY3JlYXRlUmV2aWV3SFRNTCIsInRlbXBsYXRlIiwiZGF0ZSIsInJhdGluZyIsImNvbW1lbnRzIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJmaWxsQnJlYWRjcnVtYiIsImJyZWFkY3J1bWIiLCJsaSIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsInJlcGxhY2UiLCJyZXN1bHRzIiwiUmVnRXhwIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsV0FDSixJQUFJQyxJQUVKQyxTQUFTQyxpQkFBaUIsbUJBQXFCQyxJQUM3Q0MsU0FBU0Msc0JBTVhBLGtCQUFvQixNQUNaLGtCQUFtQkMsV0FDbkJBLFVBQVVDLGNBQWNDLFNBQVMsdUJBQzVCQyxLQUFLQyxJQUNGQSxFQUFhQyxTQUNiQyxRQUFRQyxJQUFJLGlDQVE1QkMsT0FBT0MsUUFBVSxNQUNmQyx1QkFBdUIsQ0FBQ0MsRUFBT2xCLEtBQ3pCa0IsRUFDRkwsUUFBUUssTUFBTUEsSUFFZEMsS0FBS2xCLElBQU0sSUFBSW1CLE9BQU9DLEtBQUtDLElBQUlwQixTQUFTcUIsZUFBZSxRQUNyREMsS0FBTSxHQUNOQyxPQUFRekIsRUFBVzBCLE9BQ25CQyxhQUFhLElBRWZ0QixTQUFTdUIsdUJBQXVCVCxLQUFLbkIsV0FBWW1CLEtBQUtsQixVQVE1RGdCLHVCQUF5QlksT0FBT0MsSUFDOUIsR0FBSVgsS0FBS25CLFdBRVAsWUFEQThCLEVBQVMsS0FBTVgsS0FBS25CLFlBR3RCLE1BQU0rQixFQUFLQyxtQkFBbUIsTUFDOUIsR0FBS0QsRUFHRSxDQVlILElBRUksR0FEQVosS0FBS25CLGlCQUFtQmlDLFVBQVVDLG9CQUFvQkgsSUFDakRaLEtBQUtuQixXQUNOLE9BRU4sTUFBT2tCLEdBQ0xMLFFBQVFLLE1BQU1BLEdBR2xCaUIscUJBQ0FMLEVBQVMsS0FBTVgsS0FBS25CLGlCQXhCdEJrQixNQUFRLDBCQUNSWSxFQUFTWixNQUFPLFFBK0JwQmlCLG1CQUFxQixFQUFDbkMsRUFBYW1CLEtBQUtuQixjQUN6QkUsU0FBU3FCLGVBQWUsbUJBQ2hDYSxVQUFZcEMsRUFBV3FDLEtBRVpuQyxTQUFTcUIsZUFBZSxzQkFDaENhLFVBQVlwQyxFQUFXc0MsUUFFL0IsTUFBTUMsRUFBUXJDLFNBQVNxQixlQUFlLGtCQUN0Q2dCLEVBQU1DLGNBQWMsT0FBT0MsVUFBWSxpQkFDdkNGLEVBQU1DLGNBQWMsT0FBT0UsWUFBYzFDLEVBQVcrQixTQUNwRFEsRUFBTUMsY0FBYyxVQUFVRyxlQUFpQjNDLEVBQVcrQixVQUMxRFEsRUFBTUssNkJBQStCNUMsRUFBV3FDLE9BR2hDbkMsU0FBU3FCLGVBQWUsc0JBQ2hDYSxVQUFZcEMsRUFBVzZDLGFBRzNCN0MsRUFBVzhDLGlCQUNiQywwQkFHRkMsb0JBTUZELHdCQUEwQixFQUFDRSxFQUFpQjlCLEtBQUtuQixXQUFXOEMsbUJBQzFELE1BQU1JLEVBQVFoRCxTQUFTcUIsZUFBZSxvQkFDdEMsSUFBSyxJQUFJNEIsS0FBT0YsRUFBZ0IsQ0FDOUIsTUFBTUcsRUFBTWxELFNBQVNtRCxjQUFjLE1BRTdCQyxFQUFNcEQsU0FBU21ELGNBQWMsTUFDbkNDLEVBQUlsQixVQUFZZSxFQUNoQkMsRUFBSUcsWUFBWUQsR0FFaEIsTUFBTUUsRUFBT3RELFNBQVNtRCxjQUFjLE1BQ3BDRyxFQUFLcEIsVUFBWWEsRUFBZUUsR0FDaENDLEVBQUlHLFlBQVlDLEdBRWhCTixFQUFNSyxZQUFZSCxNQU90QkosZ0JBQWtCLEVBQUNTLEVBQVV0QyxLQUFLbkIsV0FBV3lELFdBQzNDLE1BQU1DLEVBQVl4RCxTQUFTcUIsZUFBZSxxQkFDcENvQyxFQUFRekQsU0FBU21ELGNBQWMsTUFJckMsR0FIQU0sRUFBTXZCLFVBQVksVUFDbEJzQixFQUFVRSxPQUFPRCxJQUVaRixFQUFTLENBQ1osTUFBTUksRUFBWTNELFNBQVNtRCxjQUFjLEtBR3pDLE9BRkFRLEVBQVV6QixVQUFZLHVCQUN0QnNCLEVBQVVILFlBQVlNLEdBR3hCLE1BQU1DLEVBQUs1RCxTQUFTcUIsZUFBZSxnQkFDbkNrQyxFQUFRTSxRQUFRQyxJQUNkRixFQUFHUCxZQUFZVSxpQkFBaUJELE1BRWxDTixFQUFVSCxZQUFZTyxLQU14QkcsaUJBQW1CLENBQUNELElBRWxCLE1BQU1FLHVEQUVrQ0YsRUFBTzNCLHdDQUNwQjJCLEVBQU9HLHdEQUNTSCxFQUFPSSxxREFDbkJKLEVBQU9LLDhCQU90QyxPQUhjbkUsU0FBU29FLGNBQ0FDLHlCQUF5QkwsS0FTbERNLGVBQWlCLEVBQUN4RSxFQUFXbUIsS0FBS25CLGNBQ2hDLE1BQU15RSxFQUFhdkUsU0FBU3FCLGVBQWUsY0FDckNtRCxFQUFLeEUsU0FBU21ELGNBQWMsTUFDbENxQixFQUFHdEMsVUFBWXBDLEVBQVdxQyxLQUMxQm9DLEVBQVdsQixZQUFZbUIsS0FNekIxQyxtQkFBcUIsRUFBQ0ssRUFBTXNDLEtBQ3JCQSxJQUNIQSxFQUFNNUQsT0FBTzZELFNBQVNDLE1BQ3hCeEMsRUFBT0EsRUFBS3lDLFFBQVEsVUFBVyxRQUMvQixNQUNFQyxFQURZLElBQUlDLGNBQWMzQyxzQkFDZDRDLEtBQUtOLEdBQ3ZCLE9BQUtJLEVBRUFBLEVBQVEsR0FFTkcsbUJBQW1CSCxFQUFRLEdBQUdELFFBQVEsTUFBTyxNQUQzQyxHQUZBIiwiZmlsZSI6InJlc3RhdXJhbnRfaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCByZXN0YXVyYW50O1xudmFyIG1hcDtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xuICBEQkhlbHBlci5pbml0U2VydmljZVdvcmtlcigpO1xuICAvLyBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMKChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xuICAvLyAgIGZpbGxCcmVhZGNydW1iKCk7XG4gIC8vIH0pO1xufSk7XG5cbmluaXRTZXJ2aWNlV29ya2VyID0gKCkgPT4ge1xuICAgIGlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIuL3NlcnZpY2Vfd29ya2VyLmpzXCIpXG4gICAgICAgICAgICAudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2Ugd29ya2VyIHJlZ2lzdGVyZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBHb29nbGUgbWFwLCBjYWxsZWQgZnJvbSBIVE1MLlxuICovXG53aW5kb3cuaW5pdE1hcCA9ICgpID0+IHtcbiAgZmV0Y2hSZXN0YXVyYW50RnJvbVVSTCgoZXJyb3IsIHJlc3RhdXJhbnQpID0+IHtcbiAgICBpZiAoZXJyb3IpIHsgLy8gR290IGFuIGVycm9yIVxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgem9vbTogMTYsXG4gICAgICAgIGNlbnRlcjogcmVzdGF1cmFudC5sYXRsbmcsXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHNlbGYucmVzdGF1cmFudCwgc2VsZi5tYXApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcmVzdGF1cmFudCBmcm9tIHBhZ2UgVVJMLlxuICovXG5mZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gYXN5bmMgKGNhbGxiYWNrKSA9PiB7XG4gIGlmIChzZWxmLnJlc3RhdXJhbnQpIHsgLy8gcmVzdGF1cmFudCBhbHJlYWR5IGZldGNoZWQhXG4gICAgY2FsbGJhY2sobnVsbCwgc2VsZi5yZXN0YXVyYW50KVxuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBpZCA9IGdldFBhcmFtZXRlckJ5TmFtZSgnaWQnKTtcbiAgaWYgKCFpZCkgeyAvLyBubyBpZCBmb3VuZCBpbiBVUkxcbiAgICBlcnJvciA9ICdObyByZXN0YXVyYW50IGlkIGluIFVSTCdcbiAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgLypcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRCeUlkKGlkLCAoZXJyb3IsIHJlc3RhdXJhbnQpID0+IHtcbiAgICAgIHNlbGYucmVzdGF1cmFudCA9IHJlc3RhdXJhbnQ7XG4gICAgICBpZiAoIXJlc3RhdXJhbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZpbGxSZXN0YXVyYW50SFRNTCgpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudClcbiAgICB9KTtcbiAgICAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBzZWxmLnJlc3RhdXJhbnQgPSBhd2FpdCBBUElIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlJZChpZCk7XG4gICAgICAgICAgaWYgKCFzZWxmLnJlc3RhdXJhbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGZpbGxSZXN0YXVyYW50SFRNTCgpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgc2VsZi5yZXN0YXVyYW50KVxuXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgcmVzdGF1cmFudCBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2VcbiAqL1xuZmlsbFJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQgPSBzZWxmLnJlc3RhdXJhbnQpID0+IHtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LW5hbWUnKTtcbiAgbmFtZS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XG5cbiAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWFkZHJlc3MnKTtcbiAgYWRkcmVzcy5pbm5lckhUTUwgPSByZXN0YXVyYW50LmFkZHJlc3M7XG5cbiAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1pbWcnKTtcbiAgaW1hZ2UucXVlcnlTZWxlY3RvcignaW1nJykuY2xhc3NOYW1lID0gJ3Jlc3RhdXJhbnQtaW1nJztcbiAgaW1hZ2UucXVlcnlTZWxlY3RvcignaW1nJykuc3JjID0gYC9pbWcvJHtyZXN0YXVyYW50LmlkfS5wbmdgO1xuICBpbWFnZS5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKS5zcmNzZXQgPSBgL2ltZy8ke3Jlc3RhdXJhbnQuaWR9LndlYnBgO1xuICBpbWFnZS5hbHQgPSBgUGljdHVyZSBvZiByZXN0YXVyYW50ICR7cmVzdGF1cmFudC5uYW1lfWA7XG4gIC8vIGltYWdlLnNyYyA9IERCSGVscGVyLmltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcblxuICBjb25zdCBjdWlzaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtY3Vpc2luZScpO1xuICBjdWlzaW5lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlO1xuXG4gIC8vIGZpbGwgb3BlcmF0aW5nIGhvdXJzXG4gIGlmIChyZXN0YXVyYW50Lm9wZXJhdGluZ19ob3Vycykge1xuICAgIGZpbGxSZXN0YXVyYW50SG91cnNIVE1MKCk7XG4gIH1cbiAgLy8gZmlsbCByZXZpZXdzXG4gIGZpbGxSZXZpZXdzSFRNTCgpO1xufVxuXG4vKipcbiAqIENyZWF0ZSByZXN0YXVyYW50IG9wZXJhdGluZyBob3VycyBIVE1MIHRhYmxlIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXG4gKi9cbmZpbGxSZXN0YXVyYW50SG91cnNIVE1MID0gKG9wZXJhdGluZ0hvdXJzID0gc2VsZi5yZXN0YXVyYW50Lm9wZXJhdGluZ19ob3VycykgPT4ge1xuICBjb25zdCBob3VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWhvdXJzJyk7XG4gIGZvciAobGV0IGtleSBpbiBvcGVyYXRpbmdIb3Vycykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIGRheS5pbm5lckhUTUwgPSBrZXk7XG4gICAgcm93LmFwcGVuZENoaWxkKGRheSk7XG5cbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICB0aW1lLmlubmVySFRNTCA9IG9wZXJhdGluZ0hvdXJzW2tleV07XG4gICAgcm93LmFwcGVuZENoaWxkKHRpbWUpO1xuXG4gICAgaG91cnMuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbGwgcmV2aWV3cyBIVE1MIGFuZCBhZGQgdGhlbSB0byB0aGUgd2VicGFnZS5cbiAqL1xuZmlsbFJldmlld3NIVE1MID0gKHJldmlld3MgPSBzZWxmLnJlc3RhdXJhbnQucmV2aWV3cykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3cy1jb250YWluZXInKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICB0aXRsZS5pbm5lckhUTUwgPSAnUmV2aWV3cyc7XG4gIGNvbnRhaW5lci5hcHBlbmQodGl0bGUpO1xuXG4gIGlmICghcmV2aWV3cykge1xuICAgIGNvbnN0IG5vUmV2aWV3cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBub1Jldmlld3MuaW5uZXJIVE1MID0gJ05vIHJldmlld3MgeWV0ISc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vUmV2aWV3cyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtbGlzdCcpO1xuICByZXZpZXdzLmZvckVhY2gocmV2aWV3ID0+IHtcbiAgICB1bC5hcHBlbmRDaGlsZChjcmVhdGVSZXZpZXdIVE1MKHJldmlldykpO1xuICB9KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHVsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcmV2aWV3IEhUTUwgYW5kIGFkZCBpdCB0byB0aGUgd2VicGFnZS5cbiAqL1xuY3JlYXRlUmV2aWV3SFRNTCA9IChyZXZpZXcpID0+IHtcblxuICBjb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGxpPlxuICAgIDxwIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwicmV2aWV3LW5hbWVcIj4ke3Jldmlldy5uYW1lfTwvcD5cbiAgICA8cCBjbGFzcz1cInJldmlldy1kYXRlXCI+JHtyZXZpZXcuZGF0ZX08L3A+XG4gICAgPHAgY2xhc3M9XCJyZXZpZXctcmF0aW5nXCI+PHNwYW4+UmF0aW5nOiAke3Jldmlldy5yYXRpbmd9PC9zcGFuPjwvcD5cbiAgICA8cCBjbGFzcz1cInJldmlldy1jb21tZW50c1wiPiR7cmV2aWV3LmNvbW1lbnRzfTwvcD5cbiAgPC9saT4gIFxuICBgO1xuXG4gIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgY29uc3QgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQodGVtcGxhdGUpO1xuXG4gIHJldHVybiBmcmFnbWVudDtcblxufVxuXG4vKipcbiAqIEFkZCByZXN0YXVyYW50IG5hbWUgdG8gdGhlIGJyZWFkY3J1bWIgbmF2aWdhdGlvbiBtZW51XG4gKi9cbmZpbGxCcmVhZGNydW1iID0gKHJlc3RhdXJhbnQ9c2VsZi5yZXN0YXVyYW50KSA9PiB7XG4gIGNvbnN0IGJyZWFkY3J1bWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJlYWRjcnVtYicpO1xuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGxpLmlubmVySFRNTCA9IHJlc3RhdXJhbnQubmFtZTtcbiAgYnJlYWRjcnVtYi5hcHBlbmRDaGlsZChsaSk7XG59XG5cbi8qKlxuICogR2V0IGEgcGFyYW1ldGVyIGJ5IG5hbWUgZnJvbSBwYWdlIFVSTC5cbiAqL1xuZ2V0UGFyYW1ldGVyQnlOYW1lID0gKG5hbWUsIHVybCkgPT4ge1xuICBpZiAoIXVybClcbiAgICB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYFs/Jl0ke25hbWV9KD0oW14mI10qKXwmfCN8JClgKSxcbiAgICByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICBpZiAoIXJlc3VsdHMpXG4gICAgcmV0dXJuIG51bGw7XG4gIGlmICghcmVzdWx0c1syXSlcbiAgICByZXR1cm4gJyc7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59XG4iXX0=