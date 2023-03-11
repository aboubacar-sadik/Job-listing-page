export default function Card(props) {
   return (
      <div className="left-content">
         <img src={props.image} alt="" />
         <div className="details-group">
            <div className="top-details">
               <span className="company-name">{props.company}</span>
               {props.new && <span className="new">New!</span>}
               {props.feature && <span className="featured">Featured</span>}
            </div>
            <h2 className="job-title">{props.jobTitle}</h2>
            <div className="bottom-details">
               <span className="date">{props.date}</span>
               <span className="dot">•</span>
               <span className="contract">{props.contract}</span>
               <span className="dot">•</span>
               <span className="location">{props.location}</span>
            </div>
         </div>
      </div>
   );
}
