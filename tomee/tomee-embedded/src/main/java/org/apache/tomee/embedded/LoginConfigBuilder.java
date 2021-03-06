/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.tomee.embedded;

import org.apache.tomcat.util.descriptor.web.LoginConfig;

public class LoginConfigBuilder {
    private final LoginConfig loginConfig = new LoginConfig();

    public LoginConfigBuilder setErrorPage(final String errorPage) {
        loginConfig.setErrorPage(errorPage);
        return this;
    }

    public LoginConfigBuilder setLoginPage(final String loginPage) {
        loginConfig.setLoginPage(loginPage);
        return this;
    }

    public LoginConfigBuilder setRealmName(final String realmName) {
        loginConfig.setRealmName(realmName);
        return this;
    }

    public LoginConfigBuilder setAuthMethod(final String authMethod) {
        loginConfig.setAuthMethod(authMethod);
        return this;
    }

    public LoginConfig build() {
        return loginConfig;
    }

    public LoginConfigBuilder basic() {
        return setAuthMethod("BASIC");
    }

    public LoginConfigBuilder digest() {
        return setAuthMethod("DIGEST");
    }

    public LoginConfigBuilder clientCert() {
        return setAuthMethod("CLIENT-CERT");
    }

    public LoginConfigBuilder form() {
        return setAuthMethod("FORM");
    }
}
