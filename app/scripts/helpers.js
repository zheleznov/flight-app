import * as config from './configs.js';

export function autoComplete (){
    let $ = window.jQuery;

    $('body').find('.airports, .arrival-airports, .departure-airports').autocomplete({
        source: function( request, response ) {
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
                }
            });
        },
        select: function( event, ui ) {
            // do something for click event
            $(this).next().val(ui.item.code);
            $('body').find('.airports-form a').removeClass('disabled');
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
