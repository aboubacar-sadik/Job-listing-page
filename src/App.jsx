import { useState } from 'react';
import Card from './components/Card';
import data from './components/data';
import clearIcon from './images/close_fill.svg';

export default function App() {
   const [cardData, setCardData] = useState(data);
   const [filterTag, setFilterTag] = useState([]);
   const [showTagsCard, setShowTagCard] = useState(false);
   const [showJobsCard, setShowJobsCard] = useState(true);

   // ADD TAGS TO THE FILTER
   function addTagToFilter(tag) {
      if (filterTag.some((el) => el === tag)) {
         setFilterTag([...filterTag]);
      } else if (filterTag.length < 7) {
         setFilterTag([...filterTag, tag]);
      }

      setShowTagCard(true);
   }

   // CLEAR ALL FILTERS TAGS
   function clearFilter() {
      setFilterTag([]);
      setShowTagCard(false);
   }

   // DELETE TAG FROM FILTER LIST
   function deleteTag(tag) {
      setFilterTag(filterTag.filter((el) => el !== tag));
   }

   // FILTER CARDS BASED ON SELECTED TAGS
   const filteredCards = cardData.filter((card) => {
      const filterTools = card.tools.concat(card.languages);
      filterTools.unshift(card.role, card.level);

      return filterTag.every((tag) => filterTools.includes(tag));
   });

   // VAR TO DISPLAY ALL CARDS
   ///////////////
   const cardItems = filteredCards.map((card) => {
      const styles = {
         borderLeft: card.featured ? '5px solid hsl(180, 29%, 50%)' : 'none',
      };

      const filterTools = card.tools.concat(card.languages);
      filterTools.unshift(card.role, card.level);

      return (
         <div className="card" key={card.id} style={styles}>
            <Card
               image={card.logo}
               company={card.company}
               new={card.new}
               feature={card.featured}
               jobTitle={card.position}
               date={card.postedAt}
               contract={card.contract}
               location={card.location}
            />
            <div className="right-content">
               {filterTools.map((tag, i) => {
                  return (
                     <p className="filter-tool" onClick={() => addTagToFilter(tag)} key={i}>
                        {tag}
                     </p>
                  );
               })}
            </div>
         </div>
      );
   });

   // SINGLE TAG IN FILTER BOX
   const tags =
      filterTag &&
      filterTag.map((tag, i) => {
         return (
            <span className="filter-tag" key={i}>
               {tag}
               <span className="image" onClick={() => deleteTag(tag)}>
                  <img src={clearIcon} alt="" />
               </span>
            </span>
         );
      });

   return (
      <div>
         <header></header>
         <main>
            <div className="card-wrapper">
               {showTagsCard && filterTag.length !== 0 ? (
                  <div className="card filter-card">
                     <div className="filter-tags-group">{tags}</div>
                     <span className="clear" onClick={clearFilter}>
                        Clear
                     </span>
                  </div>
               ) : null}
               {cardItems}
            </div>
         </main>
      </div>
   );
}
