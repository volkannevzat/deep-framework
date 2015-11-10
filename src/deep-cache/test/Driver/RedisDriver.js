'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Redis from 'ioredis';
import {RedisDriver} from '../../lib.compiled/Driver/RedisDriver';
import {RedisClusterException} from '../../lib.compiled/Driver/Exception/RedisClusterException';
import {RedisMock} from './../Mocks/RedisMock';
import {RedisDriverMock} from './../Mocks/RedisDriverMock';

chai.use(sinonChai);

suite('Driver/RedisDriver', function() {
  let redisDriver = new RedisDriverMock();
  let key = 'test_key';
  let value = 'test_value';
  let ttl = 1;
  let timeout = 1;

  test('Class RedisDriver exists in Driver/RedisDriver', function() {
    chai.expect(typeof RedisDriver).to.equal('function');
  });

  test('Check constructor sets by default _client', function() {
    chai.assert.instanceOf(redisDriver.client, Redis,
      'redisDriver.client is an instance of Redis');
  });

  test('Check _has() passes "RedisClusterException" exception in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.enableErrorMode();
      redisDriver._has(key, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWith();
      chai.assert.instanceOf(spyCallback.args[0][0],
        RedisClusterException,
        '_has() throws an instance of RedisClusterException');
    }
  );

  test('Check _get() passes "RedisClusterException" exception in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.enableErrorMode();
      redisDriver._get(key, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWith();
      chai.assert.instanceOf(spyCallback.args[0][0], RedisClusterException,
        '_get() throws an instance of RedisClusterException');
    }
  );

  test('Check _set() passes "RedisClusterException" in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.enableErrorMode();
      redisDriver._set(key, value, ttl, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWith();
      chai.assert.instanceOf(spyCallback.args[0][0], RedisClusterException,
        '_set() throws an instance of RedisClusterException');
    }
  );

  test('Check _invalidate() passes "RedisClusterException" in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.enableErrorMode();
      redisDriver._invalidate(key, timeout, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWith();
      chai.assert.instanceOf(spyCallback.args[0][0], RedisClusterException,
        '_invalidate() throws an instance of RedisClusterException');
    }
  );

  test('Check _flush() passes "RedisClusterException" in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.enableErrorMode();
      redisDriver._flush(spyCallback);
      chai.expect(spyCallback).to.have.been.calledWith();
      chai.assert.instanceOf(spyCallback.args[0][0], RedisClusterException,
        '_invalidate() throws an instance of RedisClusterException');
    }
  );

  test('Check _has() passes result in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.disableErrorMode();
      redisDriver._has(key, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWithExactly(null, RedisMock.DATA);
    }
  );

  test('Check _get() passes result in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.disableErrorMode();
      redisDriver._get(key, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWithExactly(null, RedisMock.DATA);
    }
  );

  test('Check _set() passes result in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.disableErrorMode();
      redisDriver._set(key, value, ttl, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWithExactly(null, true);
    }
  );

  test('Check _invalidate() passes result in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.disableErrorMode();
      redisDriver._invalidate(key, timeout, spyCallback);
      chai.expect(spyCallback).to.have.been.calledWithExactly(null, true);
    }
  );

  test('Check _flush() passes result in callback',
    function() {
      let spyCallback = sinon.spy();
      redisDriver.disableErrorMode();
      redisDriver._flush(spyCallback);
      chai.expect(spyCallback).to.have.been.calledWithExactly(null, true);
    }
  );
});