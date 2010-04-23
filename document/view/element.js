/*
 * Copyright (c) 2010 Sharegrove Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

msjs.publish($(<div>
    <a href="#" class="show toggle">Show code</a>
    <a href="#" class="edit toggle">Edit</a>
    <a href="#" class="save toggle">Save as</a>
    <a href="#" class="run toggle">Run code</a>
    <form>
        <table><tbody>
            <tr><th>Design document:</th><td>_design/<input name="designName" autocomplete="off"/></td></tr>
            <tr>
                <th>View name:</th>
                <td>
                    <input name="viewName" autocomplete="off"/>
                    <input type="submit" value="Save"/>
                </td>
            </tr>
        </tbody></table>
    </form>
    <span class="status"/>
    <pre class="editor"/>
</div>));

