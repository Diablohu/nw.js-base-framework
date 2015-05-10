/*************************************************
* Library for Hotkey bindings
**************************************************
*
* Default behavior for hotkey
*
* Bind on $window
* Triggered on keydown event
* Triggered globally unless:
	* any input, select or textarea element is being focused
	* default modal window is showing
* There's no conflit for hotkey binding. All binded functions will be run simultaneously when triggered.
*
**************************************************

_hotkey.bind( keyCode[, modifier], function[, options] )
	RETURNS
		true		if bind success
		false		if bind failed
	PARAMETERS
		STRING || NUMBER keyCode
			You can use STRING.charCodeAt() function to get key code for character.
		[optional] STRING || ARRAY modifier
			Keyboard modifier(s). Array means hotkey will be triggered when holding all the modifer keys.
			Example:
				CTRL
				alt
				meta
				[Ctrl, Alt]
		FUNCTION function
			Function to run.
		[optional] OBJECT options
 */




_hotkey = {
	allowed: 	true,
	keyCodeBindings: {}
}

_hotkey.bind = function(keyCode, modifier, func, options){
	if( typeof modifier == 'function' )
		return _hotkey.bind( keyCode, null, modifier, func )

	if( !keyCode || !func )
		return false

	keyCode = parseInt( keyCode )
	modifier = typeof modifier == 'text' ? [modifier] : (modifier || [])
	options = options || {}

	if( typeof _hotkey.keyCodeBindings[keyCode] )
		_hotkey.keyCodeBindings[keyCode] = {
			'default': [],
			'meta': [],
			'alt': [],
			'shift': [],
			'meta+alt': [],
			'meta+shift': [],
			'alt+shift': [],
			'meta+alt+shift': []
		}

	if( !modifier.length ){
		_hotkey.keyCodeBindings[keyCode]['default'].push( func )
	}

	return true
}

_hotkey._run = function( arr ){
	for( var i in arr )
		arr[i]()
}

_hotkey.init = function(){
	if( _hotkey.is_init )
		return _hotkey

	$window.on('keydown._hotkey', function(e){
		if( document.activeElement.tagName != 'INPUT'
			&& document.activeElement.tagName != 'TEXTAREA'
			&& document.activeElement.tagName != 'SELECT'
			&& !document.activeElement.hasAttribute('contenteditablea')
			&& _hotkey.allowed
		){
			var keyCode = parseInt( e.keyCode || e.which )
			if( _hotkey.keyCodeBindings[keyCode] ){
				if( !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey ){
					_hotkey._run( _hotkey.keyCodeBindings[keyCode]['default'] )
				}
			}
		}
	})

	_hotkey.is_init = true
}
