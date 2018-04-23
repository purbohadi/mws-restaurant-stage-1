class APIHelper{static getBaseUrl(){return"https://api.vlogz.win"}static fetchRestaurants(){const t=`${APIHelper.getBaseUrl()}/restaurants`;return fetch(t)}static async fetchRestaurantByCuisineAndNeighborhood(t,e){let a=await APIHelper.getAllRestaurants();return"all"!=t&&(a=a.filter(e=>e.cuisine_type==t)),"all"!=e&&(a=a.filter(t=>t.neighborhood==e)),a}static async fetchRestaurantById(t){try{let e=await localforage.getItem(String(t));if(!e){const a=`${APIHelper.getBaseUrl()}/restaurants/${t}`,r=await fetch(a);e=await r.json(),localforage.setItem(String(e.id),e)}return e}catch(t){console.error(t)}}static async getAllRestaurants(){const t=[];return await localforage.iterate(function(e,a,r){t.push(e),console.log([a,e])}),t}static get(t){const e=`${APIHelper.getBaseUrl()}/restaurants/${t}`;return fetch(e)}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaWhlbHBlci5qcyJdLCJuYW1lcyI6WyJBUElIZWxwZXIiLCJbb2JqZWN0IE9iamVjdF0iLCJ1cmwiLCJnZXRCYXNlVXJsIiwiZmV0Y2giLCJjdWlzaW5lIiwibmVpZ2hib3Job29kIiwicmVzdGF1cmFudHMiLCJnZXRBbGxSZXN0YXVyYW50cyIsImZpbHRlciIsInIiLCJjdWlzaW5lX3R5cGUiLCJpZCIsInJlc3RhdXJhbnQiLCJsb2NhbGZvcmFnZSIsImdldEl0ZW0iLCJTdHJpbmciLCJyZXNwb25zZSIsImpzb24iLCJzZXRJdGVtIiwiZXJyb3IiLCJjb25zb2xlIiwiaXRlbXMiLCJpdGVyYXRlIiwidmFsdWUiLCJrZXkiLCJpdGVyYXRpb25OdW1iZXIiLCJwdXNoIiwibG9nIl0sIm1hcHBpbmdzIjoiTUFHTUEsVUFDRkMsb0JBQ0ksTUFBTyx3QkFNWEEsMEJBQ0ksTUFBTUMsS0FBU0YsVUFBVUcsMkJBQ3pCLE9BQU9DLE1BQU1GLEdBR2pCRCxxREFBcURJLEVBQVNDLEdBRTFELElBQUlDLFFBQW9CUCxVQUFVUSxvQkFRbEMsTUFOZSxPQUFYSCxJQUNBRSxFQUFjQSxFQUFZRSxPQUFPQyxHQUFLQSxFQUFFQyxjQUFnQk4sSUFFeEMsT0FBaEJDLElBQ0FDLEVBQWNBLEVBQVlFLE9BQU9DLEdBQUtBLEVBQUVKLGNBQWdCQSxJQUVyREMsRUFHWE4saUNBQWlDVyxHQUM3QixJQUNJLElBQUlDLFFBQW1CQyxZQUFZQyxRQUFRQyxPQUFPSixJQUNsRCxJQUFLQyxFQUFZLENBQ2IsTUFBTVgsS0FBU0YsVUFBVUcsNEJBQTRCUyxJQUMvQ0ssUUFBaUJiLE1BQU1GLEdBQzdCVyxRQUFtQkksRUFBU0MsT0FDNUJKLFlBQVlLLFFBQVFILE9BQU9ILEVBQVdELElBQUtDLEdBRS9DLE9BQU9BLEVBQ1QsTUFBT08sR0FDTEMsUUFBUUQsTUFBTUEsSUFJdEJuQixpQ0FDSSxNQUFNcUIsS0FLTixhQUpNUixZQUFZUyxRQUFRLFNBQVNDLEVBQU9DLEVBQUtDLEdBQzNDSixFQUFNSyxLQUFLSCxHQUNYSCxRQUFRTyxLQUFLSCxFQUFLRCxNQUVmRixFQUdYckIsV0FBV1csR0FDUCxNQUFNVixLQUFTRixVQUFVRyw0QkFBNEJTLElBQ3JELE9BQU9SLE1BQU1GIiwiZmlsZSI6ImFwaWhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tbW9uIGRhdGFiYXNlIGhlbHBlciBmdW5jdGlvbnMuXG4gKi9cbmNsYXNzIEFQSUhlbHBlciB7XG4gICAgc3RhdGljIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIHJldHVybiAnaHR0cHM6Ly9hcGkudmxvZ3oud2luJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBhbGwgcmVzdGF1cmFudHMuXG4gICAgICovXG4gICAgc3RhdGljIGZldGNoUmVzdGF1cmFudHMoKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAke0FQSUhlbHBlci5nZXRCYXNlVXJsKCl9L3Jlc3RhdXJhbnRzYDtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChjdWlzaW5lLCBuZWlnaGJvcmhvb2QpIHtcblxuICAgICAgICBsZXQgcmVzdGF1cmFudHMgPSBhd2FpdCBBUElIZWxwZXIuZ2V0QWxsUmVzdGF1cmFudHMoKTtcblxuICAgICAgICBpZiAoY3Vpc2luZSAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgY3Vpc2luZVxuICAgICAgICAgICAgcmVzdGF1cmFudHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmVpZ2hib3Job29kICE9ICdhbGwnKSB7IC8vIGZpbHRlciBieSBuZWlnaGJvcmhvb2RcbiAgICAgICAgICAgIHJlc3RhdXJhbnRzID0gcmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGZldGNoUmVzdGF1cmFudEJ5SWQoaWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXN0YXVyYW50ID0gYXdhaXQgbG9jYWxmb3JhZ2UuZ2V0SXRlbShTdHJpbmcoaWQpKTtcbiAgICAgICAgICAgIGlmICghcmVzdGF1cmFudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke0FQSUhlbHBlci5nZXRCYXNlVXJsKCl9L3Jlc3RhdXJhbnRzLyR7aWR9YDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgICAgICAgICAgcmVzdGF1cmFudCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBsb2NhbGZvcmFnZS5zZXRJdGVtKFN0cmluZyhyZXN0YXVyYW50LmlkKSwgcmVzdGF1cmFudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGdldEFsbFJlc3RhdXJhbnRzKCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICBhd2FpdCBsb2NhbGZvcmFnZS5pdGVyYXRlKGZ1bmN0aW9uKHZhbHVlLCBrZXksIGl0ZXJhdGlvbk51bWJlcikge1xuICAgICAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhba2V5LCB2YWx1ZV0pO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldChpZCkge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHtBUElIZWxwZXIuZ2V0QmFzZVVybCgpfS9yZXN0YXVyYW50cy8ke2lkfWBcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCk7XG4gICAgfVxufSJdfQ==
