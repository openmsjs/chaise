msjs.publish($(<div>
    <a href="#" class="show toggle">Show code</a>
    <a href="#" class="run toggle">Run code</a>
    <a href="#" class="edit toggle">Edit</a>
    <a href="#" class="save toggle">Save as</a>
    <form>
        <table><tbody>
            <tr><th>Design document:</th><td>_design/<input name="designName"/></td></tr>
            <tr>
                <th>View name:</th>
                <td>
                    <input name="viewName"/>
                    <input type="submit" value="Save"/>
                </td>
            </tr>
        </tbody></table>
    </form>
    <span class="status"/>
    <pre/>
</div>));

