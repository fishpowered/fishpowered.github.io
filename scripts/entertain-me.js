'use strict';

const el = React.createElement;

function EntertainMe (props) {
	const [ selectedTags, setSelectedTagsState ] = React.useState([]);

	// https://en.wikipedia.org/wiki/List_of_hobbies
	const tags = [
		// Location
		[1, 'indoors'],
		[2, 'outdoors'],
		
		// Motivation
		[3, 'fun'],
		[4, 'educational'],
		[10, 'productive'],
		[6, 'exercise'],
		[5, 'creative'],
		[5, 'competitive'],
		[11, 'rewarding'],
		[11, 'relaxing'],
		[9, 'inspirational'],
		[11, 'travel'],
		[11, 'culture'],
		[11, 'food'],
		
		// Company
		[5, 'friends'],
		[5, 'family'],
		[5, 'alone'],
		[5, 'pair'],
		[5, 'team'],
		
		// Cost
		[7, 'free'],
		[8, 'cheap'],
		[8, 'expensive'],
		
		// AGE RANGE
		// todo
		
	];
	
	// TODO support links 
	const ideas = [
		['Bike ride', [2, 6, 7]],
		['Play a board game', [1, 3, 7]],
		['Learn a language', [1, 4, 7, 8, 10]],
		['Play cards', [1, 3, 7]],
		['Walk around town', [2, 3, 6]],
		['Read a book', [1, 2, 4, 7, 8, 9]],
		['Make something for someone', [1, 5, 8, 11]],
		['Fly a kite', []],
		['Read a book about someone you admire', []],
		['Catch up with an old friend', []],
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
			tags.map(([tagKey, tagName]) => SelectableTag(tagKey, tagName, selectedTags, setSelectedTagsState)),
			filteredIdeas.map((idea) => el('p', {key:idea[0]}, idea[0])),	
		]
	);

}

function SelectableTag(tagKey, tagName, selectedTags, setSelectedTagsState){
	const isAlreadySelected = selectedTags.includes(tagKey);
	const allButCurrentTag = selectedTags.length==0 ? selectedTags : selectedTags.filter(selectedTag => selectedTag!=tagKey);
	const newSelectedState = isAlreadySelected ? allButCurrentTag : [...selectedTags, tagKey];
	console.log(tagKey+" = "+tagName);
	return el(
	  'label',
	  { key:'lbl_'+tagKey, className: 'tag '+(isAlreadySelected ? 'selected' : '') }, // onClick: () => setLiked(true)
	  [
		el('input', { key:'chk_'+tagKey, title:tagName, type:'checkbox', value:tagKey, onChange: () => setSelectedTagsState(newSelectedState)}),
		tagName
	  ]
	);
}
const domContainer = document.querySelector('#react_mount');
ReactDOM.render(el(EntertainMe), domContainer);
