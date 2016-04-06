import * as config from './configs.js';
import idb from './idb.js';

export function autoComplete (){
    let $ = window.jQuery;

    $('body').find('.airports, .arrival-airports, .departure-airports').autocomplete({
        source: function( request, response ) {
            var targetInput = this.element['0'];

            $.ajax({
                url: "//www.air-port-codes.com/search/",
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    term: request.term, // input field value
                    limit: 7, // default is 30
                    size: 3, // default is 0
                    key: config.airportsAPIKey // dont forget to add your API Key from your air-port-codes.com account
                },
                success: function( data ) {
                    console.log(targetInput)
                    if (data.status) { // success
                        response( $.map( data.airports, function( item ) {
                            let storage = localStorage.airports !== undefined ? JSON.parse(localStorage.airports) : [];
                            var result = false;

                            storage.forEach((elem)=>{
                                if(elem.iata === item.iata) result = true;
                            });

                            if(!result) storage.push(item);

                            localStorage.airports = JSON.stringify(storage);

                            return {
                                label: item.name + ' (' + item.iata + ')',
                                value: item.name + ' (' + item.iata + ')',
                                code: item.iata
                            }
                        }));
                    } else { // no results
                        response();
                    }
                },
                error: function(err){
                    if(err.status === 404) {
                        let city = targetInput.value,
                            data = JSON.parse(localStorage.airports);

                        response( $.map( data, function( item ) {
                            if(item.city.toLowerCase().indexOf(city.toLowerCase()) >= 0 && city.length >= 3) {
                                return {
                                    label: item.name + ' (' + item.iata + ')',
                                    value: item.name + ' (' + item.iata + ')',
                                    code: item.iata
                                }
                            }
                        }));
                    }
                }
            });
        },
        select: function( event, ui ) {
            // do something for click event
            $(this).next().val(ui.item.code);
            $(this).closest('form').find('a').removeClass('disabled');
        }
    });
}

export function datePicker() {
    let $ = window.jQuery;

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 //
    });
}

export function getSchedule (data) {
    let $ = window.jQuery;
    let requestUrl = `${config.basicUrl}/from/${data.depIata}/to/${data.arrIata}/departing/${data.date.year}/${data.date.month}/${data.date.day}?appId=${config.appID}&appKey=${config.appKey}`;

    return Promise.resolve($.ajax(requestUrl, {dataType: 'jsonp'}));
}

export function saveToDB(cities, data) {
    /*let versNumber = parseInt(localStorage.dbVersion) || 0;
    versNumber += 1;

    let dbPromise = idb.open('flight-db', versNumber, upgradeDB=> {
        switch (upgradeDB.oldVersion) {
            case 0:
                upgradeDB.createObjectStore(cities.depIata + '-' + cities.arrIata, {keyPath: 'index'});
        }
    });

    dbPromise.then(db=> {
        let tx = db.transaction(cities.depIata + '-' + cities.arrIata, 'readwrite');
        let store = tx.objectStore(cities.depIata + '-' + cities.arrIata);

        data.forEach((elem, index)=> {
            store.put({
                index: index,
                flightNumber: elem.flightNumber,
                departureAirportFsCode: elem.departureAirportFsCode,
                arrivalAirportFsCode: elem.arrivalAirportFsCode,
                departureTime: elem.departureTime,
                arrivalTime: elem.arrivalTime
            });
        });

        return tx.complete;
    });*/
    let key = cities.depIata + '-' + cities.arrIata;
    localStorage[key] = JSON.stringify(data);
}
