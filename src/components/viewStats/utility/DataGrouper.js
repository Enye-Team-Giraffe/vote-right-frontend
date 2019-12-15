/* eslint-disable */
// disabling eslint for this file because it is an auxilarry file
// copied from the net an dsimply meant to be a package to import and use
// an auxilarry function use to group an object by multiple keys
const _ = require('underscore');

const DataGrouper = (function () {
    const has = function (obj, target) {
        return _.any(obj, value => _.isEqual(value, target));
    };

    const keys = function (data, names) {
        return _.reduce(data, (memo, item) => {
            const key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    const group = function (data, names) {
        const stems = keys(data, names);
        return _.map(stems, stem => ({
            key: stem,
            vals: _.map(_.where(data, stem), item => _.omit(item, names)),
        }));
    };

    group.register = function (name, converter) {
        return group[name] = function (data, names) {
            return _.map(group(data, names), converter);
        };
    };

    return group;
}());

DataGrouper.register('count', item => _.extend({}, item.key, {
    Value: _.reduce(item.vals, (memo, node) => memo + 1, 0),
}));

export default DataGrouper;
