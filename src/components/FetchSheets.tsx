import React from 'react';

export const SHEETS_PREFIX = "gsx$";

export function readFromSheets(sheetUrl: string) {
	return fetch(sheetUrl).then(body => body.json());
}