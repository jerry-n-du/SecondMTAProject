function saveCountry (country) {
	let conn = $.hdb.getConnection();
	let fnCreateCountry = conn.loadProcedure("SecondMTAProject.db::createCountry");
	let result = fnCreateCountry({IM_COUNTRY: country.name, IM_CONTINENT: country.partof});
	conn.commit();
	conn.close();
	
	if (result && result.ERROR_MESSAGE != null) {
		return result.ERROR_MESSAGE;
	} else {
		return JSON.stringify(country);
	}
}

let country = {
	name: $.request.parameters.get('name'),
	partof: $.request.parameters.get('continent')
}

let output = saveCountry(country);

$.response.contentType = 'application/json';
$.response.setBody(output);