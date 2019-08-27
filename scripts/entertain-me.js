'use strict';

const el = React.createElement;

function EntertainMe (props) {
	const [ selectedTags, setSelectedTagsState ] = React.useState([]);
	
	const tags = [
		['indoor'],
		['outdoor'],
		['game'],
		['educational'],
		['creative'],
		['exercice'],
		['free']
	];
	
	const ideas = [
		['Go for a bike ride', ['outdoor', 'exercise']],
		['Go for a walk', ['outdoor', 'exercise']],
		['Read a book', ['outdoor', 'indoor', 'educational']]
	];
	
	// TODO look at React.memo if need to caching filtering
	let filteredIdeas = ideas.filter((idea) => selectedTags.every(v => idea[1].includes(v)));
    
	if(filteredIdeas.length===0){
		filteredIdeas.push(['None found', []]);
	}
	
    return el(
		'div',
		{className:'tagList'},
		[
			tags.map((tag) => SelectableTag(tag, selectedTags, setSelectedTagsState)),
			filteredIdeas.map((idea) => el('p', {key:idea[0]}, idea[0])),	
		]
	);
		
}

function SelectableTag(tag, selectedTags, setSelectedTagsState){
	const isAlreadySelected = selectedTags.includes(tag[0]);
	const allButCurrentTag = selectedTags.length==0 ? selectedTags : selectedTags.filter(selectedTag => selectedTag!=tag);
	const newSelectedState = isAlreadySelected ? allButCurrentTag : [...selectedTags, tag[0]];
	return el(
	  'label',
	  { key:tag[0], className: 'tag '+(isAlreadySelected ? 'selected' : '') }, // onClick: () => setLiked(true)
	  [
		el('input', { title:tag[0], type:'checkbox',  onChange: () => setSelectedTagsState(newSelectedState)}),
		tag[0]
	  ]
	);
}
const domContainer = document.querySelector('#react_mount');
ReactDOM.render(el(EntertainMe), domContainer);