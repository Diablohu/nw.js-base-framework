/*************************************************
* Library for Hotkey bindings
**************************************************
*
* Default behavior for hotkey
*
* Bind on $window
* Triggered globally except:
	* when any input, select or textarea element is being focused
	* when default modal window is showing
*
**************************************************

_hotkey.bind( key[, modifier], function[, options] )

 */




_hotkey = {}

_hotkey.bind = function(key, modifier, func, options){
	if( typeof modifier == 'function' )
		return _hotkey.bind( key, null, func, options )

	if( !key || !func )
		return false

	modifier = typeof modifier == 'text' ? [modifier] : (modifier || [])
	options = options || {}

	return true
}
